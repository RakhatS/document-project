import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { OrganizationService } from 'src/app/_services/organization.service';

@Component({
  selector: 'app-members-admin-page',
  templateUrl: './members-admin-page.component.html',
  styleUrls: ['./members-admin-page.component.scss']
})
export class MembersAdminPageComponent implements OnInit {


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
