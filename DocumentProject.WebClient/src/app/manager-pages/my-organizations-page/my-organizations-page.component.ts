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


}
