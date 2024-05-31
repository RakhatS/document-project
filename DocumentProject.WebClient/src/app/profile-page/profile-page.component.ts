import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Manager } from '../_models/manager';
import { Member } from '../_models/member';
import { Constants } from '../_helpers/contants';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AccessTokenService } from '../_services/accesstoken.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PhotoModel } from '../_models/photo-model';
import { ManagerService } from '../_services/manager.service';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = false;
  currentUser: Member | Manager | undefined | null | any;
  isUploadPhotoModalOpened: boolean = false;
  photoModel: PhotoModel = new PhotoModel();
  role: string | null = "Manager";

  userImageFilename: string | undefined;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  newImageBase64: any = '';

  ngOnInit(): void {
    this.role = this.accessTokenService.getUserRole();
    this.getCurrentUser();

  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private accessTokenService: AccessTokenService,
    private imageCompress: NgxImageCompressService,
    private managerService: ManagerService,
    private memberService: MemberService
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
    this.resetNewPhotoObjects()
  }


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
  uploadProfilePhoto() {
    this.imageCompress
      .compressFile(this.croppedImage, -1, 50, 50, 450, 450)
      .then(
        (compressedImage) => {
          this.photoModel.photoBase64 = compressedImage.split(',')[1];
          if (this.role == 'Manager') {
            this.uploadManagerProfilePhoto();
          } else if (this.role == 'Member') {
            this.uploadMemberProfilePhoto();
          }
        }
      );
  }

  resetNewPhotoObjects() {
    this.photoModel = new PhotoModel();
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.userImageFilename = undefined;

  }

  uploadMemberProfilePhoto() {
    this.loading = true;
    this.memberService.uploadProfilePhoto(this.photoModel).subscribe(res => {
      this.toastr.success("Photo has been uploaded succesfully");
      this.loading = false;
      this.closeUploadPhotoModal();
      this.getCurrentUser();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })

  }
  uploadManagerProfilePhoto() {
    this.loading = true;
    this.managerService.uploadProfilePhoto(this.photoModel).subscribe(res => {
      this.toastr.success("Photo has been uploaded succesfully");
      this.loading = false;
      this.closeUploadPhotoModal();
      this.getCurrentUser();
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }

  updateUser(){
    if(this.role == 'Member'){
      this.updateMember();
    }
    else if(this.role == 'Manager'){
      this.updateManager();
    }
  }

  updateManager(){
    this.loading = true;
    this.managerService.updateManager(this.currentUser).subscribe(res=> {
      this.toastr.success("Profile has been updated succesfully");
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }
  updateMember(){
    this.loading = true;
    this.memberService.updateMember(this.currentUser).subscribe(res=> {
      this.toastr.success("Profile has been updated succesfully");
      this.loading = false;
    }, error => {
      this.toastr.error(error.statusText);
      this.loading = false;
    })
  }
}
