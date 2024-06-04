import { Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from '../_services/organization.service';
import { AccessTokenService } from '../_services/accesstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../_services/application.service';
import { MemberService } from '../_services/member.service';
import { Organization } from '../_models/organization';
import { Member } from '../_models/member';

@Component({
  selector: 'app-organization-members-page',
  templateUrl: './organization-members-page.component.html',
  styleUrls: ['./organization-members-page.component.scss']
})
export class OrganizationMembersPageComponent implements OnInit {

  @Input() organization: Organization | undefined;
  newMember: Member = new Member();
  loading:boolean=false;

  ngOnInit(): void {
    this.getMembers();
  }

  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private memberService: MemberService
  ) { }


  getMembers() {
    if (!this.organization || !this.organization.id)
      return;

    this.loading = true;

    this.memberService.getOrganizationMembers(this.organization.id).subscribe(res => {
      this.organization!.members = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  createMember() {
    if (!this.organization || !this.organization.id)
      return;


    this.newMember.organizationId = this.organization.id;

    this.loading = true;
    this.memberService.createOrganizationMember(this.newMember).subscribe(res => {
      this.newMember = new Member();
      this.loading = false;
      this.getMembers();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
}
