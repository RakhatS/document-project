import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MyOrganizationsPageComponent } from './my-organizations-page/my-organizations-page.component';
import { OrganizationPageComponent } from './organization-page/organization-page.component';
import { MyOrganizationPageComponent } from './my-organization-page/my-organization-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { OrganizationMembersPageComponent } from './organization-members-page/organization-members-page.component';
import { OrganizationApplicationsPageComponent } from './organization-applications-page/organization-applications-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { OrganizationsAdminPageComponent } from './organizations-admin-page/organizations-admin-page.component';
import { MembersAdminPageComponent } from './members-admin-page/members-admin-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'my-organizations', component: MyOrganizationsPageComponent, canActivate: [AuthGuard] },
  { path: 'my-organization', component: MyOrganizationPageComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organizationId', component: OrganizationPageComponent, canActivate: [AuthGuard] },
  { path: 'organization-applications/:organizationId', component: OrganizationApplicationsPageComponent, canActivate: [AuthGuard] },
  { path: 'organization-members/:organizationId', component: OrganizationMembersPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsPageComponent, canActivate: [AuthGuard] },


  { path: 'admin/organizations', component: OrganizationsAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/members', component: MembersAdminPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
