import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { MemberService } from 'src/app/_services/member.service';
import { OrganizationService } from 'src/app/_services/organization.service';

@Component({
  selector: 'app-members-admin-page',
  templateUrl: './members-admin-page.component.html',
  styleUrls: ['./members-admin-page.component.scss']
})
export class MembersAdminPageComponent implements OnInit {

  loading: boolean = false;
  members: Member[] = [];

  constructor(private memberService: MemberService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Admin") {
      this.router.navigate(['/']);
      return;
    }
    this.getMembers();
  }


  getMembers() {
    this.loading = true;
    this.memberService.getMembersList().subscribe(res => {
      this.members = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
}
