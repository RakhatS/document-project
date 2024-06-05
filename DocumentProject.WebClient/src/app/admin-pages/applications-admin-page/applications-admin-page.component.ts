import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/_models/application';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { OrganizationService } from 'src/app/_services/organization.service';

@Component({
  selector: 'app-applications-admin-page',
  templateUrl: './applications-admin-page.component.html',
  styleUrls: ['./applications-admin-page.component.scss']
})
export class ApplicationsAdminPageComponent implements OnInit {

  loading: boolean = false;
  applications: Application[] = [];

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
