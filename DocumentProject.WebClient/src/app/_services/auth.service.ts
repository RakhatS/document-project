import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenService } from './accesstoken.service';
import { RegisterModel } from '../_models/registermodel';
import { Observable } from 'rxjs';
import { LoginModel } from '../_models/loginmodel';
import { ManagerService } from './manager.service';
import { MemberService } from './member.service';
import { Constants } from '../_helpers/contants';
import { Manager } from '../_models/manager';
import { Member } from '../_models/member';
import { AdminService } from './admin.service';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = Constants.ServerUrl +  "api/Auth";


  constructor(
    private http: HttpClient,
    private accessTokenService: AccessTokenService,
    private memberService: MemberService,
    private managerService: ManagerService,
    private adminService: AdminService
  ) { }


  managerSignUp(model: RegisterModel): Observable<any> {
    let api = this.api + "/Manager/SignUp";
    return this.http.post<any>(api, model);
  }
  signIn(model: LoginModel): Observable<any> {
    let api = this.api + "/SignIn";
    return this.http.post<any>(api, model);
  }

  managerSignIn(model: LoginModel): Observable<any> {
    let api = this.api + "/Manager/SignIn";
    return this.http.post<any>(api, model);
  }

  memberSignIn(model: RegisterModel): Observable<any> {
    let api = this.api + "/Member/SignIn";
    return this.http.post<any>(api, model);
  }


  currentUser(): Observable<Manager | Member | Admin | null> {
    var role = this.accessTokenService.getUserRole();

    if (role == "Manager") {
      return this.managerService.currentManager();
    }
    else if(role == 'Admin') {
      return this.adminService.currentAdmin();
    }
    else{
      return this.memberService.currentMember();
    }
  }

}
