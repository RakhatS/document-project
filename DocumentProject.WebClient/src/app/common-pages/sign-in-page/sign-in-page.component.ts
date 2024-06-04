import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../_models/loginmodel';
import { AuthService } from '../../_services/auth.service';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  loading: boolean = false;
  loginModel: LoginModel = new LoginModel();
  incorrectLogin: boolean = false;
  isInCorrect = false;

  constructor(private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void { }


  async login() {
    this.isInCorrect = false;
    this.loading = true
    this.authService.signIn(this.loginModel).subscribe(async res => {
      this.accessTokenService.setAccessToken(res["access_token"]);

      this.authService.currentUser().subscribe(c => {
        // this.accountService.currentUser = c;
        this.router.navigate(['/']);
        this.loading = false;
        this.isInCorrect = false;
      })
    }, async err => {
      this.isInCorrect = true;
      this.loading = false;
      this.toastr.error("Invalid username or password");
    });
  }

}
