import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndpointService } from "@liveo/services";
import { AuthenticationService } from "../../modules/shared/services/authentication/authentication.service";
import { ConnectionStateService } from "../connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class ShutdownService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _connectionStateService: ConnectionStateService,
    private _authenticationService: AuthenticationService) {
  }

  public async shutdown(): Promise<any> {
    this._httpClient
      .post(this._endpointService.getEndpoint("shutdown"), null)
      .toPromise();
    this._authenticationService.logout();
    this._connectionStateService.checkOfflineAndNavigate("Shutdown");
  }
}
