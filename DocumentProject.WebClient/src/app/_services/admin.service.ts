import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { Observable } from 'rxjs';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  api = Constants.ServerUrl + "api/Admin";

  constructor(private http: HttpClient) { }


  currentAdmin(): Observable<Admin | null> {
    let api = this.api + "/Current";
    return this.http.get<Admin | null>(api);
  }
}
