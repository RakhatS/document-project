import { Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from '../_services/organization.service';
import { AccessTokenService } from '../_services/accesstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../_services/application.service';
import { MemberService } from '../_services/member.service';
import { Application } from '../_models/application';
import { Organization } from '../_models/organization';

@Component({
  selector: 'app-organization-applications-page',
  templateUrl: './organization-applications-page.component.html',
  styleUrls: ['./organization-applications-page.component.scss']
})
export class OrganizationApplicationsPageComponent implements OnInit {

  @Input() organization: Organization | undefined;
  isApplicationDetailsModalOpened: boolean = false;
  selectedApplication: Application | undefined;
  loading:boolean=false;

  ngOnInit(): void {
    this.getApplications();
  }

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private memberService: MemberService
  ) { }


  getApplications() {
    if (!this.organization || !this.organization.id)
      return;

    this.loading = true;
    this.applicationService.getOrganizationApplications(this.organization.id).subscribe(res => {
      this.organization!.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    });
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
