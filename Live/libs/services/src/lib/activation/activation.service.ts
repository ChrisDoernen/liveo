import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { ActivationEntity } from "@live/entities";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActivationService {
  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getActivation(): Observable<ActivationEntity> {
    return this._httpClient.get<ActivationEntity>(this._endpointService.getEndpoint("activation"));
  }

  public setActivation(activation: ActivationEntity): Observable<ActivationEntity> {
    return this._httpClient.post<ActivationEntity>(this._endpointService.getEndpoint("activation"), activation);
  }

  public deleteActivation(): Observable<ActivationEntity> {
    return this._httpClient.delete<ActivationEntity>(this._endpointService.getEndpoint("activation"));
  }
}
