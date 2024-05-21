import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';
import { Constants } from '../_helpers/contants';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  api = Constants.ServerUrl + "api/Member";

  constructor(private http: HttpClient) { }

  currentMember(): Observable<Member> {
    let api = this.api + "/Current";
    return this.http.get<Member>(api);
  }
}
