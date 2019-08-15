import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivationEntity } from "@live/entities";
import { Subject, Observable } from "rxjs";
import { EndpointService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class ActivationService {
  private _activation: Subject<ActivationEntity> = new Subject<ActivationEntity>();

  public activation$: Observable<ActivationEntity> = this._activation.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  public getActivation(): void {
    this._httpClient
      .get<ActivationEntity>(this._endpointService.getEndpoint("activation")).toPromise()
      .then((activation) => this._activation.next(activation));
  }

  public setActivation(newActivation: ActivationEntity): void {
    console.log(`Setting new activation: ${JSON.stringify(newActivation)}.`);
    this._httpClient.post<ActivationEntity>(this._endpointService.getEndpoint("activation"), newActivation).toPromise()
      .then((activation) => this._activation.next(activation));
  }

  public deleteActivation(): void {
    console.log(`Deleting activation:.`);
    this._httpClient.delete<ActivationEntity>(this._endpointService.getEndpoint("activation")).toPromise()
      .then((activation) => this._activation.next(activation));
  }
}
