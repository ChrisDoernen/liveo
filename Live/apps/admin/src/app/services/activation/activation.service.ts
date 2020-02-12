import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivationEntity, ActivationState } from "@live/entities";
import { ActivationStateService, EndpointService, Logger } from "@live/services";
import { ReplaySubject } from "rxjs";
import { NotificationService } from '../notification/notification.service';

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
    this._logger.info(`Emitting activation ${JSON.stringify(activation)}`);
    this._logger.info(`Emitting activation state ${activationState}`)
    this._activationState.next(activationState);
    this._activation.next(activation);
  }

  constructor(
    private readonly _logger: Logger,
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService,
    private readonly _notificationService: NotificationService,
    private readonly _activationStateService: ActivationStateService) {
    this._notificationService.notifications$.subscribe(() => this.getActivation());
  }

  public getActivation(): void {
    this._httpClient
      .get<ActivationEntity>(this._endpointService.getEndpoint("activation"))
      .toPromise()
      .then((activation) => this.activation = activation);
  }

  public setActivation(newActivation: ActivationEntity): void {
    this._logger.info(`Setting new activation: ${JSON.stringify(newActivation)}`);
    this._httpClient
      .post<ActivationEntity>(this._endpointService.getEndpoint("activation"), newActivation)
      .toPromise()
      .then((activation) => this.activation = activation);
  }

  public deleteActivation(): void {
    this._logger.info(`Deleting activation.`);
    this._httpClient
      .delete<ActivationEntity>(this._endpointService.getEndpoint("activation"))
      .toPromise()
      .then((activation) => this.activation = activation);
  }
}
