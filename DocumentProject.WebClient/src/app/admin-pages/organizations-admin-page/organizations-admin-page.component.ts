import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_helpers/contants';
import { Manager } from 'src/app/_models/manager';
import { Organization } from 'src/app/_models/organization';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { ManagerService } from 'src/app/_services/manager.service';
import { MemberService } from 'src/app/_services/member.service';
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

  newOrganization: Organization = new Organization();
  managers: Manager[] = [];

  selectedOrganization: Organization | undefined;

  isCreateNewOrganizationModalOpened: boolean = false;
  isUpdateNewOrganizationModalOpened: boolean = false;

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService, private managerService: ManagerService
  ) { }
  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }

    this.getOrganizations();
    this.getManagers();
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

  openCreateNewOrganizationModal(){
    this.newOrganization = new Organization();
    this.isCreateNewOrganizationModalOpened = true;

  }
  closeCreateNewOrganizationModal(){
    this.isCreateNewOrganizationModalOpened = false;
  }

  openUpdateNewOrganizationModal(organization: Organization) {
    this.selectedOrganization = organization;
    this.isUpdateNewOrganizationModalOpened = true;  
  }
  closeUpdateNewOrganizationModal(){
    this.isUpdateNewOrganizationModalOpened = false;
    this.selectedOrganization = undefined;
  }


  createOrganization() {
    this.loading = true;

    this.organizationService.createOrganizationForManager(this.newOrganization).subscribe(res => {

      this.newOrganization = new Organization();
      this.loading = false;
      this.closeCreateNewOrganizationModal();
      this.getOrganizations();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  updateOrganization() {
    if (!this.selectedOrganization){
      return;
    }

    this.loading = true;

    this.organizationService.updateOrganizationByAdmin(this.selectedOrganization).subscribe(res => {
      this.loading = false;
      this.selectedOrganization!.ownerManager = this.managers.find(x => x.id == this.selectedOrganization?.ownerManagerId);
      this.closeUpdateNewOrganizationModal();

    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
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

}
