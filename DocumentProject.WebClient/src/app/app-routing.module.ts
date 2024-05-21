import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MyOrganizationsPageComponent } from './my-organizations-page/my-organizations-page.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInPageComponent },

  { path: 'my-organizations', component: MyOrganizationsPageComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organizationId', component: OrganizationPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
