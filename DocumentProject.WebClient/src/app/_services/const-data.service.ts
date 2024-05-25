import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { HttpClient } from '@angular/common/http';
import { ApplicationName } from '../_models/application-name';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstDataService {
  
  api = Constants.ServerUrl + "api/ConstData";
  
  constructor(private http: HttpClient) { }

  getApplicationNames(): Observable<ApplicationName[]> {
    let api = this.api + "/ApplicationNames";
    return this.http.get<ApplicationName[]>(api);
  }
}
