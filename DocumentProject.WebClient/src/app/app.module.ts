import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_partials/header/header.component';
import { MenuComponent } from './_partials/menu/menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyOrganizationsPageComponent } from './my-organizations-page/my-organizations-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { MyOrganizationPageComponent } from './my-organization-page/my-organization-page.component';
import { SafeHtmlPipe } from './_helpers/pipes/pipe.safehtml';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { OrganizationMembersPageComponent } from './organization-members-page/organization-members-page.component';
import { OrganizationApplicationsPageComponent } from './organization-applications-page/organization-applications-page.component';

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
