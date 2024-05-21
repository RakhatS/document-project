import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../_services/organization.service';
import { AccessTokenService } from '../_services/accesstoken.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from '../_models/organization';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {


  organizationId: string | undefined;
  organization: Organization | undefined;

  loading: boolean = false;


  constructor(private organizationService: OrganizationService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() != "Manager") {
      this.router.navigate(['/']);
      return;
    }

    this.route.params.subscribe(params => {
      this.organizationId = params['organizationId'];
      this.getOrganization();
    })
  }

  getOrganization() {
    if (!this.organizationId)
      return;


    this.loading = true;
    this.organizationService.getOrganizationById(this.organizationId).subscribe(res => {
      this.organization = res;
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }
}
