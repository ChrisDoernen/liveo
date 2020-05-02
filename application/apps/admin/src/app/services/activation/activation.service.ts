import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EVENTS } from "@liveo/constants";
import { ActivationEntity, ActivationStateEntity } from "@liveo/entities";
import { EndpointService, Logger } from "@liveo/services";
import { Store } from "@ngxs/store";
import { ActivationStateUpdateAction, ActivationUpdateAction } from "../../actions/state.actions";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class ActivationService {

  private set activation(activation: ActivationEntity) {
    this._store.dispatch(new ActivationUpdateAction(activation));
  }

  constructor(
    private readonly _logger: Logger,
    private readonly _httpClient: HttpClient,
    private readonly _endpointService: EndpointService,
    private readonly _websocketService: WebsocketService,
    private readonly _store: Store
  ) {
    this.subscribeActivationStateUpdates();
  }

  public subscribeActivationStateUpdates(): void {
    this._logger.info("Subscribe activation state updates");
    this._websocketService.fromEvent<ActivationStateEntity>(EVENTS.adminActivationStateUpdate)
      .subscribe((activationState: ActivationStateEntity) => {
        this._store.dispatch(new ActivationStateUpdateAction(activationState))
      });
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
