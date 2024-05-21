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
    try {
      let currentUser = await this.authService.currentUser().toPromise();
      if (currentUser == null) {
        this.router.navigate(['/sign-in']);
        return false;
      }
      return true;
    }
    catch {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

}