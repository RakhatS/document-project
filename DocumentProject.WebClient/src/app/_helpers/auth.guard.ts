import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AccessTokenService } from "../_services/accesstoken.service";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private accessTokenService: AccessTokenService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentPerson = await this.authService.currentUser().toPromise();
    if (currentPerson == null) {
      this.router.navigate(['/']);
      return false;
    }
    if (route.data)
      this.checkUserLogin(route);
    return true;
  }
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.accessTokenService.getUserRole();
    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}