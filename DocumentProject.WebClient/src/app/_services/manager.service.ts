import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../_models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }


  currentManager(): Observable<Manager> {
    let api = "/Current";
    return this.http.get<Manager>(api);
  }
}
