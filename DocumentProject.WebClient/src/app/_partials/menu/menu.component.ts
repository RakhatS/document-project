import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  role: string | null = "Manager";

  constructor(private accessTokenService: AccessTokenService,
    private router: Router
  ){
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.role = this.accessTokenService.getUserRole();
      }
    });

    }

  ngOnInit(): void {
    
  }

}
