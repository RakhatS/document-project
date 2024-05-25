import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { Application } from '../_models/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  api = Constants.ServerUrl + "api/Application";

  constructor(private http: HttpClient) { }

  createApplication(newApplication: Application): Observable<Application> {
    let api = this.api + "/Create";
    return this.http.post<Application>(api, newApplication);
  }

  getMemberApplications(): Observable<Application[]> {
    let api = this.api + "/MemberApplications";
    return this.http.get<Application[]>(api);
  }

  getOrganizationApplications(organizationId: string): Observable<Application[]> {
    let api = this.api + "/OrganizationApplications?organizationId=" + organizationId;
    return this.http.get<Application[]>(api);
  }

  deleteApplication(applicationId: string): Observable<Application> {
    let api = this.api + "/Delete?applicationId=" + applicationId;
    return this.http.delete<Application>(api);
  }

  changeApplicationStatus(applicationId: string, newStatus: string): Observable<Application> {
    let api = this.api + "/ChangeStatus?applicationId=" + applicationId + "&newStatus=" + newStatus;
    return this.http.put<Application>(api, null);
  }

  getApplicationDocument(applicationId: string): Observable<any> {
    let api = this.api + "/ApplicationDocument?applicationId=" + applicationId;
    return this.http.get<any>(api);
  }

}
