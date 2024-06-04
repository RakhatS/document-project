import { Component } from '@angular/core';
import { RegisterModel } from '../../_models/registermodel';
import { AuthService } from '../../_services/auth.service';
import { AccessTokenService } from '../../_services/accesstoken.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  loading: boolean = false;
  registerModel: RegisterModel = new RegisterModel();
  incorrectLogin: boolean = false;

  constructor(private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void { }


  async register() {
    this.registerModel.email = this.registerModel.email?.trim();

    if(this.registerModel.password != this.registerModel.passwordConfirm){
      this.toastr.warning("Passwords do not match")
    }

    this.loading = true
    this.authService.managerSignUp(this.registerModel).subscribe(async res => {
      this.toastr.success("You have succesfully signed up");
        this.router.navigate(['/sign-in']);
        this.loading = false;
    }, async err => {
      this.loading = false;
      this.toastr.error(err.message);
    });
  }
}
