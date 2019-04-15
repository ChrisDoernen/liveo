import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { Shutdown } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class ShutdownService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public async setShutdown(shutdown: Shutdown): Promise<any> {
    this._httpClient
      .post(this._endpointService.getEndpoint("shutdown"), shutdown)
      .toPromise();
  }
}
