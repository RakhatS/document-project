import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_helpers/contants';
import { Organization } from 'src/app/_models/organization';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { OrganizationService } from 'src/app/_services/organization.service';

@Component({
  selector: 'app-organizations-admin-page',
  templateUrl: './organizations-admin-page.component.html',
  styleUrls: ['./organizations-admin-page.component.scss']
})
export class OrganizationsAdminPageComponent implements OnInit {
  
  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  organizations: Organization[] = [];
  loading: boolean = false;

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

    this.getOrganizations();
  }

  getOrganizations() {
    this.loading = true;
    this.organizationService.getOrganizationsList().subscribe(x => {
      this.organizations = x;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
  forceDelete(organizationId: string) {
    this.loading = true;
    this.organizationService.forceDeleteOrganization(organizationId).subscribe(res => {
      this.loading = false;
      this.getOrganizations();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

}
