import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../_models/manager';
import { Constants } from '../_helpers/contants';
import { PhotoModel } from '../_models/photo-model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  api = Constants.ServerUrl + "api/Manager";

  constructor(private http: HttpClient) { }


  currentManager(): Observable<Manager | null> {
    let api = this.api + "/Current";
    return this.http.get<Manager | null>(api);
  }
  uploadProfilePhoto(photoModel: PhotoModel): Observable<any> {
    let api = this.api + "/UploadProfilePhoto";
    return this.http.post<any>(api, photoModel);
  }
}
