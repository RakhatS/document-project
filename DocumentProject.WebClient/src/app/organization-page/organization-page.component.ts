import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../_services/organization.service';
import { AccessTokenService } from '../_services/accesstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from '../_models/organization';
import { ApplicationService } from '../_services/application.service';
import { MemberService } from '../_services/member.service';
import { Member } from '../_models/member';
import { Application } from '../_models/application';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {


  organizationId: string | undefined;
  organization: Organization | undefined;
  newMember: Member = new Member();
  loading: boolean = false;

  isApplicationDetailsModalOpened: boolean = false;
  selectedApplication: Application | undefined;


  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Manager") {
      this.router.navigate(['/']);
      return;
    }

    this.route.params.subscribe(params => {
      this.organizationId = params['organizationId'];

      this.getOrganization();
    });
  }

  getOrganization() {
    if (!this.organizationId)
      return;


    this.loading = true;
    this.organizationService.getOrganizationById(this.organizationId).subscribe(res => {
      this.organization = res;
      console.log(this.organization);

      this.loading = false;
      this.getApplications();
      this.getMembers();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    });
  }


  getApplications() {
    if (!this.organizationId || !this.organization)
      return;

    this.loading = true;
    this.applicationService.getOrganizationApplications(this.organizationId).subscribe(res => {
      this.organization!.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    });
  }


  getMembers() {
    if (!this.organizationId || !this.organization)
      return;

    this.loading = true;

    this.memberService.getOrganizationMembers(this.organizationId).subscribe(res => {
      this.organization!.members = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }

  createMember() {
    if (!this.organizationId || !this.organization)
      return;

    this.newMember.organizationId = this.organizationId;

    this.loading = true;
    this.memberService.createOrganizationMember(this.newMember).subscribe(res => {
      this.newMember = new Member();
      this.loading = false;
      this.getMembers();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }



  openApplicationDetailsModal(application: Application) {
    this.selectedApplication = application;
    this.getApplicationDocument(application);
    this.isApplicationDetailsModalOpened = true;
  }
  closeApplicationDetailsModal() {
    this.isApplicationDetailsModalOpened = false;
    this.selectedApplication = undefined;
  }


  getApplicationDocument(application: Application) {
    this.loading = true;
    this.applicationService.getApplicationDocument(application.id!).subscribe(res => {
      application.document = res.content;

      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }

  changeApplicationStatus(application: Application, newStatus: string) {
    this.loading = true;
    this.applicationService.changeApplicationStatus(application.id!, newStatus).subscribe(res => {
      application.status = res.status;

      this.loading = false;
      this.getApplicationDocument(application);
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }
}
