import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_helpers/contants';
import { Observable } from 'rxjs';
import { Admin } from '../_models/admin';
import { PhotoModel } from '../_models/photo-model';

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


  uploadProfilePhoto(photoModel: PhotoModel): Observable<any> {
    let api = this.api + "/UploadProfilePhoto";
    return this.http.post<any>(api, photoModel);
  }

  updateAdmin(updatedAdmin: Admin): Observable<any> {
    let api = this.api + "/Update";
    return this.http.put<any>(api, updatedAdmin);
  }
}
