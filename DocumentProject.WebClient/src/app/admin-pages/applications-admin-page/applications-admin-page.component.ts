import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/_models/application';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { ApplicationService } from 'src/app/_services/application.service';

@Component({
  selector: 'app-applications-admin-page',
  templateUrl: './applications-admin-page.component.html',
  styleUrls: ['./applications-admin-page.component.scss']
})
export class ApplicationsAdminPageComponent implements OnInit {

  loading: boolean = false;
  applications: Application[] = [];
  selectedStatus: string | null = null;

  constructor(private applicationService: ApplicationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }
    this.getApplications();
  }

  getApplications() {
    this.loading = true;
    this.applicationService.getApplicationsList().subscribe(res => {
      this.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  getFilteredApplications(): Application[]{
    if(this.selectedStatus != null && this.selectedStatus != 'All'){
      return this.applications.filter(x => x.status == this.selectedStatus);
    }
    return this.applications;
  }
}
