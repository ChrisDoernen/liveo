import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ConnectionStateService } from "../services/connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _connectionStateService: ConnectionStateService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const online = this._connectionStateService.isOnline;
    if (online) {
      return true;
    }

    this._router.navigate(["/offline"]);
    return false;
  }
}
