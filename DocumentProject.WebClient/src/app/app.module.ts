import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_partials/header/header.component';
import { MenuComponent } from './_partials/menu/menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyApplicationsPageComponent } from './my-applications-page/my-applications-page.component';
import { MyOrganizationsPageComponent } from './my-organizations-page/my-organizations-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MainPageComponent,
    MyApplicationsPageComponent,
    MyOrganizationsPageComponent,
    SignInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
