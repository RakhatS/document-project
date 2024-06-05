import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './common-pages/main-page/main-page.component';
import { SignInPageComponent } from './common-pages/sign-in-page/sign-in-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { MyOrganizationsPageComponent } from './manager-pages/my-organizations-page/my-organizations-page.component';
import { OrganizationPageComponent } from './manager-pages/organization-page/organization-page.component';
import { MyOrganizationPageComponent } from './member-pages/my-organization-page/my-organization-page.component';
import { ProfilePageComponent } from './common-pages/profile-page/profile-page.component';
import { AboutUsPageComponent } from './common-pages/about-us-page/about-us-page.component';
import { OrganizationMembersPageComponent } from './manager-pages/organization-members-page/organization-members-page.component';
import { OrganizationApplicationsPageComponent } from './manager-pages/organization-applications-page/organization-applications-page.component';
import { SignUpPageComponent } from './common-pages/sign-up-page/sign-up-page.component';
import { OrganizationsAdminPageComponent } from './admin-pages/organizations-admin-page/organizations-admin-page.component';
import { MembersAdminPageComponent } from './admin-pages/members-admin-page/members-admin-page.component';
import { ApplicationsAdminPageComponent } from './admin-pages/applications-admin-page/applications-admin-page.component';
import { ManagersAdminPageComponent } from './admin-pages/managers-admin-page/managers-admin-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },

  { path: 'member/my-organization', component: MyOrganizationPageComponent, canActivate: [AuthGuard] },

  { path: 'manager/my-organizations', component: MyOrganizationsPageComponent, canActivate: [AuthGuard] },
  { path: 'manager/organization/:organizationId', component: OrganizationPageComponent, canActivate: [AuthGuard] },
  { path: 'manager/organization-applications/:organizationId', component: OrganizationApplicationsPageComponent, canActivate: [AuthGuard] },
  { path: 'manager/organization-members/:organizationId', component: OrganizationMembersPageComponent, canActivate: [AuthGuard] },

  
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsPageComponent, canActivate: [AuthGuard] },


  { path: 'admin/organizations', component: OrganizationsAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/members', component: MembersAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/applications', component: ApplicationsAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/managers', component: ManagersAdminPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
