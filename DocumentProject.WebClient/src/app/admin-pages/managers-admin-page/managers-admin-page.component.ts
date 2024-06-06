import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Manager } from 'src/app/_models/manager';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { ManagerService } from 'src/app/_services/manager.service';

@Component({
  selector: 'app-managers-admin-page',
  templateUrl: './managers-admin-page.component.html',
  styleUrls: ['./managers-admin-page.component.scss']
})
export class ManagersAdminPageComponent implements OnInit {
  loading: boolean = false;
  managers: Manager[] = [];

  constructor(private managerService: ManagerService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }
    this.getManagers();
  }


  getManagers() {
    this.loading = true;
    this.managerService.getManagersList().subscribe(res => {
      this.managers = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }


  forceDelete(managerId: string) {
    this.loading = true;
    this.managerService.forceDeleteManager(managerId).subscribe(res => {
      this.loading = false;
      this.getManagers();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
}
