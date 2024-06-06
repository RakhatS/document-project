import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { Router } from '@angular/router';
import { MemberService } from '../../_services/member.service';
import { Application } from '../../_models/application';
import { OrganizationService } from '../../_services/organization.service';
import { Member } from '../../_models/member';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../../_services/application.service';
import { Organization } from '../../_models/organization';
import { Constants } from '../../_helpers/contants';


@Component({
  selector: 'app-my-organization-page',
  templateUrl: './my-organization-page.component.html',
  styleUrls: ['./my-organization-page.component.scss']
})
export class MyOrganizationPageComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = false;
  
  member: Member | undefined | null;
  organization: Organization | undefined;



  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Member") {
      this.router.navigate(['/']);
      return;
    }

    this.getMember();
  
  }


  getMember() {
    this.loading = true;

    this.memberService.currentMember().subscribe(res => {
      this.member = res;
      this.loading = false;
      this.getOrganization();
    }, error => {
      this.toastr.error(error.message);
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
      this.toastr.error(error.message);
      this.loading = false;
    });
  }


 
}
