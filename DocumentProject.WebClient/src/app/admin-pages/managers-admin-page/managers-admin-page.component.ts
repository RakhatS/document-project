import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Manager } from 'src/app/_models/manager';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { OrganizationService } from 'src/app/_services/organization.service';

@Component({
  selector: 'app-managers-admin-page',
  templateUrl: './managers-admin-page.component.html',
  styleUrls: ['./managers-admin-page.component.scss']
})
export class ManagersAdminPageComponent implements OnInit {
  loading: boolean = false;
  managers: Manager[] = [];

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }
  }
}
