import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Manager } from '../_models/manager';
import { Member } from '../_models/member';
import { Constants } from '../_helpers/contants';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = false;
  currentUser: Manager | Member | undefined | null;
  isUploadPhotoModalOpened: boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();

  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }


  getCurrentUser() {
    this.loading = true;
    this.authService.currentUser().subscribe(res => {
      this.currentUser = res;
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.toastr.error(error.statusText)
      })
  }


  openUploadPhotoModal() {
    this.isUploadPhotoModalOpened = true;
  }
  closeUploadPhotoModal() {
    this.isUploadPhotoModalOpened = false;
  }










  userImageFilename: string | undefined;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  newImageBase64: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.userImageFilename = event.target.files[0].name;
  }

  fileAddPhotoChangeEvent(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newImageBase64 = reader.result;
    };

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready

  }
  loadImageFailed() {
    // show message
  }
  uploadProfilePhoto(){}
}
