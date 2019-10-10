import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { ConnectionStateService } from "../services/connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateGuard implements CanActivate {

  constructor(
    private _connectionStateService: ConnectionStateService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await this._connectionStateService.checkOfflineWhenNavigating();
  }
}
