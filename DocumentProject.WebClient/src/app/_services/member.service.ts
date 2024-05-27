import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';
import { Constants } from '../_helpers/contants';
import { PhotoModel } from '../_models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  api = Constants.ServerUrl + "api/Member";

  constructor(private http: HttpClient) { }

  currentMember(): Observable<Member | null> {
    let api = this.api + "/Current";
    return this.http.get<Member | null>(api);
  }

  createOrganizationMember(newMember: Member): Observable<Member> {
    let api = this.api + "/CreateOrganizationMember";
    return this.http.post<Member>(api, newMember);
  }

  getOrganizationMembers(organizationId: string): Observable<Member[]> {
    let api = this.api + "/OrganizationMembers?organizationId=" + organizationId;
    return this.http.get<Member[]>(api);
  }


  uploadProfilePhoto(photoModel: PhotoModel): Observable<any> {
    let api = this.api + "/UploadProfilePhoto";
    return this.http.post<any>(api, photoModel);
  }

  updateMember(updatedMember: Member): Observable<any> {
    let api = this.api + "/Update";
    return this.http.put<any>(api, updatedMember);
  }
}
