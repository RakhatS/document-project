import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading: boolean = true;
  currentUser: any | undefined;

  ngOnInit(): void {
    
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private toastr: ToastrService
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.getCurrentUser();
      }
    });

  }


  getCurrentUser() {
    this.loading = true;
    this.authService.currentUser().subscribe(res => {
      

      this.currentUser = res;
      this.loading = false;
    },
      error => {
        this.currentUser = undefined;
        this.toastr.error(error.statusText);
        this.loading = false;
      })
  }



  logout() {
    this.accessTokenService.removeAccessToken();
    this.router.navigate(['sign-in']);
    // this.getCurrentAdmin();

  }

    
}
