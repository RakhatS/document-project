import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../_models/organization';
import { Constants } from '../_helpers/contants';
import { Observable } from 'rxjs';
import { Manager } from '../_models/manager';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  api = Constants.ServerUrl + "api/Organization";

  constructor(private http: HttpClient) { }


  createOrganization(newOrganization: Organization): Observable<Organization> {
    let api = this.api + "/Create";
    return this.http.post<Organization>(api, newOrganization);
  }

  getOrganizationById(organizationid: string): Observable<Organization> {
    let api = this.api + "/GetById?organizationid=" + organizationid;
    return this.http.get<Organization>(api);
  }

  getManagerOrganizations(): Observable<Organization[]> {
    let api = this.api + "/ManagerOrganizations";
    return this.http.get<Organization[]>(api);
  }


  getOrganizationsList(): Observable<Organization[]> {
    let api = this.api + "/OrganizationsList";
    return this.http.get<Organization[]>(api);
  }


  forceDeleteOrganization(organizationId: string): Observable<any> {
    let api = this.api + "/ForceDelete?organizationId=" + organizationId;
    return this.http.delete<any>(api);
  }
}
