import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../_services/organization.service';
import { Organization } from '../../_models/organization';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-organizations-page',
  templateUrl: './my-organizations-page.component.html',
  styleUrls: ['./my-organizations-page.component.scss']
})
export class MyOrganizationsPageComponent implements OnInit {

  loading: boolean = false;

  organizations: Organization[] = [];

  selectedOrganization: Organization | undefined;

  isUpdateNewOrganizationModalOpened: boolean = false;

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Manager") {
      this.router.navigate(['/']);
      return;
    }
    this.getOrganizations();
  }


  getOrganizations(){
    this.loading = true;
    this.organizationService.getManagerOrganizations().subscribe(x => {
      this.organizations = x;
      this.loading = false; 
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  openUpdateNewOrganizationModal(organization: Organization) {
    this.selectedOrganization = organization;
    this.isUpdateNewOrganizationModalOpened = true;
  }
  closeUpdateNewOrganizationModal() {
    this.isUpdateNewOrganizationModalOpened = false;
    this.selectedOrganization = undefined;
  }


  updateOrganization() {
    if (!this.selectedOrganization) {
      return;
    }

    this.loading = true;

    this.organizationService.updateOrganization(this.selectedOrganization).subscribe(res => {
      this.loading = false;
      this.closeUpdateNewOrganizationModal();

    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
}
