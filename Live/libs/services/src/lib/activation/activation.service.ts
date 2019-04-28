import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EndpointService } from "../endpoint/endpoint.service";
import { ActivationEntity } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class ActivationService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public async getActivation(): Promise<ActivationEntity> {
    return this._httpClient
      .get(this._endpointService.getEndpoint("activation"), {
        observe: "response",
        responseType: "json"
      })
      .pipe(
        map((response: any) =>
          response.status === 200 ? (response.body as ActivationEntity) : null
        )
      )
      .toPromise();
  }

  public async setActivation(activation: ActivationEntity): Promise<any> {
    this._httpClient
      .post(this._endpointService.getEndpoint("activation"), activation)
      .toPromise();
  }
}
