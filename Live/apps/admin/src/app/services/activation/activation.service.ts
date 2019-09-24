import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivationEntity, ActivationState } from "@live/entities";
import { ReplaySubject } from "rxjs";
import { EndpointService, ActivationStateService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class ActivationService {
  private _activation = new ReplaySubject<ActivationEntity>();
  private _activationState = new ReplaySubject<ActivationState>();

  public activation$ = this._activation.asObservable();
  public activationState$ = this._activationState.asObservable();

  private set activation(activation: ActivationEntity) {
    const activationState = this._activationStateService.determineActivationState(activation);
    console.log(`Emitting activation ${JSON.stringify(activation)}.`);
    console.log(`Emitting activation state ${activationState}.`)
    this._activationState.next(activationState);
    this._activation.next(activation);
  }

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _activationStateService: ActivationStateService) {
  }

  public getActivation(): void {
    this._httpClient
      .get<ActivationEntity>(this._endpointService.getEndpoint("activation")).toPromise()
      .then((activation) => this.activation = activation);
  }

  public setActivation(newActivation: ActivationEntity): void {
    console.log(`Setting new activation: ${JSON.stringify(newActivation)}.`);
    this._httpClient
      .post<ActivationEntity>(this._endpointService.getEndpoint("activation"), newActivation).toPromise()
      .then((activation) => this.activation = activation);
  }

  public deleteActivation(): void {
    console.log(`Deleting activation.`);
    this._httpClient
      .delete<ActivationEntity>(this._endpointService.getEndpoint("activation")).toPromise()
      .then((activation) => this.activation = activation);
  }
}
