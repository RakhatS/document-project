import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../_services/accesstoken.service';
import { Router } from '@angular/router';
import { MemberService } from '../_services/member.service';
import { Application } from '../_models/application';
import { OrganizationService } from '../_services/organization.service';
import { Member } from '../_models/member';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../_services/application.service';
import { Organization } from '../_models/organization';

@Component({
  selector: 'app-my-organization-page',
  templateUrl: './my-organization-page.component.html',
  styleUrls: ['./my-organization-page.component.scss']
})
export class MyOrganizationPageComponent implements OnInit {

  loading: boolean = false;
  applications: Application[] = [];
  member: Member | undefined;
  organization: Organization | undefined;
  newApplication: Application = new Application();

  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private applicationService: ApplicationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Member") {
      this.router.navigate(['/']);
      return;
    }

    this.getMember();
    this.getApplications();
  }


  getMember() {
    this.loading = true;

    this.memberService.currentMember().subscribe(res => {
      this.member = res;
      this.loading = false;
      this.getOrganization();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    });
  }

  getOrganization() {
    if (!this.member || !this.member.organizationId) {
      return;
    }
    this.loading = true;

    this.organizationService.getOrganizationById(this.member.organizationId).subscribe(res => {
      this.organization = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    });
  }

  getApplications() {
    this.loading = true;

    this.applicationService.getMemberApplications().subscribe(res => {
      this.applications = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }

  createApplication() {
    if(!this.organization || !this.member){
      return;
    }

    this.newApplication.organizationId = this.organization.id;  
    this.newApplication.memberId = this.member.id;

    this.applicationService.createApplication(this.newApplication).subscribe(res => {
      this.loading = false;
      this.newApplication = new Application();
      this.getApplications();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })

  }
}
