import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivationEntity, ActivationState } from "@live/entities";
import { Subject, Observable } from "rxjs";
import { EndpointService, ActivationStateService } from "@live/services";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ActivationService {
  private _activation = new Subject<ActivationEntity>();
  private _activationState = new Subject<ActivationState>();

  public activation$ = this._activation.pipe(tap((actvation) => this.actualizeActivationState(actvation)));
  public activationState$ = this._activationState.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService,
    private _activationStateService: ActivationStateService) {
  }

  public getActivation(): void {
    this._httpClient
      .get<ActivationEntity>(this._endpointService.getEndpoint("activation"))
      .subscribe((activation) => {
        this._activation.next(activation);
      });
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

  private actualizeActivationState(activation: ActivationEntity): void {
    const activationState = this._activationStateService.determineActivationState(activation);
    this._activationState.next(activationState);
  }
}
