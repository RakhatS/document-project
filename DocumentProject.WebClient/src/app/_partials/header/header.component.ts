import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_helpers/contants';
import { Manager } from 'src/app/_models/manager';
import { Member } from 'src/app/_models/member';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = true;
  currentUser: Manager | Member | undefined | null;

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
        // this.toastr.error(error.message);
        this.loading = false;
      })
  }



  logout() {
    this.accessTokenService.removeAccessToken();
    this.router.navigate(['sign-in']);
    // this.getCurrentAdmin();

  }

    
}
