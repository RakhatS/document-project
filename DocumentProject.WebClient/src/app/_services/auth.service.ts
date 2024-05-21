import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenService } from './accesstoken.service';
import { RegisterModel } from '../_models/registermodel';
import { Observable } from 'rxjs';
import { LoginModel } from '../_models/loginmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiStudent = "api/Auth";


  constructor(
    private http: HttpClient,
    private accessTokenService: AccessTokenService
  ) { }


  managerSignUp(model: RegisterModel): Observable<any> {
    let api = "/Manager/SignUp";
    return this.http.post<any>(api, model);
  }


  managerSignIn(model: LoginModel): Observable<any> {
    let api = "/Manager/SignIn";
    return this.http.post<any>(api, model);
  }

  memberSignIn(model: RegisterModel): Observable<any> {
    let api = "/Member/SignIn";
    return this.http.post<any>(api, model);
  }
}
