import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_partials/header/header.component';
import { MenuComponent } from './_partials/menu/menu.component';
import { MainPageComponent } from './common-pages/main-page/main-page.component';
import { MyOrganizationsPageComponent } from './manager-pages/my-organizations-page/my-organizations-page.component';
import { SignInPageComponent } from './common-pages/sign-in-page/sign-in-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { OrganizationPageComponent } from './manager-pages/organization-page/organization-page.component';
import { MyOrganizationPageComponent } from './member-pages/my-organization-page/my-organization-page.component';
import { SafeHtmlPipe } from './_helpers/pipes/pipe.safehtml';
import { ProfilePageComponent } from './common-pages/profile-page/profile-page.component';
import { AboutUsPageComponent } from './common-pages/about-us-page/about-us-page.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { OrganizationMembersPageComponent } from './manager-pages/organization-members-page/organization-members-page.component';
import { OrganizationApplicationsPageComponent } from './manager-pages/organization-applications-page/organization-applications-page.component';
import { SignUpPageComponent } from './common-pages/sign-up-page/sign-up-page.component';
import { OrganizationsAdminPageComponent } from './admin-pages/organizations-admin-page/organizations-admin-page.component';
import { MembersAdminPageComponent } from './admin-pages/members-admin-page/members-admin-page.component';
import { ApplicationsAdminPageComponent } from './admin-pages/applications-admin-page/applications-admin-page.component';
import { ManagersAdminPageComponent } from './admin-pages/managers-admin-page/managers-admin-page.component';
import { MyAppicationsMemberPageComponent } from './member-pages/my-appications-member-page/my-appications-member-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MainPageComponent,
    MyOrganizationsPageComponent,
    SignInPageComponent,
    OrganizationPageComponent,
    MyOrganizationPageComponent,


    SafeHtmlPipe,
      ProfilePageComponent,
      AboutUsPageComponent,
      OrganizationMembersPageComponent,
      OrganizationApplicationsPageComponent,
      SignUpPageComponent,
      OrganizationsAdminPageComponent,
      MembersAdminPageComponent,
      ApplicationsAdminPageComponent,
      ManagersAdminPageComponent,
      MyAppicationsMemberPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ImageCropperModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
