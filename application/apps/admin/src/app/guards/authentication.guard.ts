import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../modules/shared/services/authentication/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this._authenticationService.isUserLoggedIn()) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
