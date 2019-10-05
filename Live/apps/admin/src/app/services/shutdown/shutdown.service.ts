import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Shutdown } from "@live/entities";
import { EndpointService } from "@live/services";
import { ConnectionStateService } from "../connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class ShutdownService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _connectionStateService: ConnectionStateService) {
  }

  public async setShutdown(shutdown: Shutdown): Promise<any> {
    this._httpClient
      .post(this._endpointService.getEndpoint("shutdown"), shutdown)
      .toPromise();
    this._connectionStateService.("Shutdown");
  }
}
