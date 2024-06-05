import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { Observable } from 'rxjs';
import { NotificationModel } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api = Constants.ServerUrl + "api/Notification";

  constructor(private http: HttpClient) { }



  getMemberNotifications(): Observable<NotificationModel[]> {
    let api = this.api + "/MemberNotifications";
    return this.http.get<NotificationModel[]>(api);
  }


  getManagerNotifications(): Observable<NotificationModel[]> {
    let api = this.api + "/ManagerNotifications";
    return this.http.get<NotificationModel[]>(api);
  }


  markMemberNotificationAsRead(notificationId: string): Observable<any> {
    let api = this.api + "/MarkMemberNotificationAsRead?notificationId=" + notificationId;
    return this.http.put<any>(api, null);
  }


  markManagerNotificationAsRead(notificationId: string): Observable<any> {
    let api = this.api + "/MarkManagerNotificationAsRead?notificationId=" + notificationId;
    return this.http.put<any>(api, null);
  }
}
