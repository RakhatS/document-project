import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../_services/accesstoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  constructor(private accessTokenService: AccessTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.accessTokenService.getUserRole() == "Manager") {
      this.router.navigate(['my-organizations']);
    }
    else if (this.accessTokenService.getUserRole() == "Member") { 
      this.router.navigate(['my-organization']);
    }
    else if (this.accessTokenService.getUserRole() == "Admin") {
      this.router.navigate(['admin/organizations']);
    }
  }

}
