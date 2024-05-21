import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../_services/organization.service';
import { Organization } from '../_models/organization';

@Component({
  selector: 'app-my-organizations-page',
  templateUrl: './my-organizations-page.component.html',
  styleUrls: ['./my-organizations-page.component.scss']
})
export class MyOrganizationsPageComponent implements OnInit {

  loading: boolean = false;

  organizations: Organization[] = []

  newOrganization: Organization = new Organization();

  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
  }


  createOrganization(){
    
  }
}
