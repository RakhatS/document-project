import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api = Constants.ServerUrl + "api/Notification";

  constructor(private http: HttpClient) { }



  getMemberNotifications(): Observable<Notification[]> {
    let api = this.api + "/MemberNotifications";
    return this.http.get<Notification[]>(api);
  }


  getManagerNotifications(): Observable<Notification[]> {
    let api = this.api + "/ManagerNotifications";
    return this.http.get<Notification[]>(api);
  }
}
