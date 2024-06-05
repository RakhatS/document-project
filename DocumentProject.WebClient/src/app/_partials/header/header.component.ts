import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_helpers/contants';
import { Manager } from 'src/app/_models/manager';
import { Member } from 'src/app/_models/member';
import { NotificationModel } from 'src/app/_models/notification';
import { AccessTokenService } from 'src/app/_services/accesstoken.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isShowNotifications: boolean = false;

  imagePrefixToDisplay: string = Constants.ImagePrefixToDisplay;

  loading: boolean = true;
  currentUser: Manager | Member | undefined | null;
  notifications: NotificationModel[] = [];

  ngOnInit(): void {

  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private accessTokenService: AccessTokenService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.getCurrentUser();
        this.getNotifications();
      }
    });

  }


  getCurrentUser() {
    this.loading = true;
    this.authService.currentUser().subscribe(res => {


      this.currentUser = res;
      this.loading = false;
    },
      error => {
        this.currentUser = undefined;
        // this.toastr.error(error.message);
        this.loading = false;
      })
  }



  logout() {
    this.accessTokenService.removeAccessToken();
    this.router.navigate(['sign-in']);
    // this.getCurrentAdmin();

  }

  getNotifications() {
    if (this.accessTokenService.getUserRole() == 'Manager') {
      this.getManagerNotifications();
    } 
    else if (this.accessTokenService.getUserRole() == 'Member') {
      this.getMemberNotifications();
    }
  }

  getMemberNotifications() {
    this.loading = true;
    this.notificationService.getMemberNotifications().subscribe(x => {
      this.notifications = x;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  getManagerNotifications() {
    this.loading = true;
    this.notificationService.getManagerNotifications().subscribe(x => {
      this.notifications = x;
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }


  markAsReadNotification(notificationId: string){
    if (this.accessTokenService.getUserRole() == 'Manager') {
      this.markAsReadManagerNotification(notificationId);
    }
    else if (this.accessTokenService.getUserRole() == 'Member') {
      this.markAsReadMemberNotification(notificationId);
    }
  }

  markAsReadMemberNotification(notificationId: string){
    this.loading = true;
    this.notificationService.markMemberNotificationAsRead(notificationId).subscribe(x => {
      this.loading = false;
      this.getNotifications();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }


  markAsReadManagerNotification(notificationId: string) {
    this.loading = true;
    this.notificationService.markManagerNotificationAsRead(notificationId).subscribe(x => {
      this.loading = false;
      this.getNotifications();
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

}
