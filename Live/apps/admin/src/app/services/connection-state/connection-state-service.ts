import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndpointService, Logger } from "@live/services";
import { ReplaySubject } from "rxjs";
import { ConnectionState } from "./connection-state";
import { LifecycleState } from "./lifecycle-state";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateService {

  private _connectionState = new ReplaySubject<ConnectionState>();

  public connectionState$ = this._connectionState.asObservable();

  public isOnline: boolean;

  constructor(
    private _logger: Logger,
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  private emitConnectionState(connectionState: ConnectionState) {
    this._logger.info(`Emitting connection state: ${JSON.stringify(connectionState)}.`);
    this._connectionState.next(connectionState);
    this.isOnline = connectionState.online;
  }

  public checkConnectionState(lifecycleState: LifecycleState): void {
    this._httpClient.get(this._endpointService.getEndpoint(`connection`), { responseType: "text" }).toPromise()
      .then(() => this.emitConnectionState({ online: true, lifecycleState: lifecycleState }))
      .catch((error) => this.emitConnectionState({ online: false, lifecycleState: lifecycleState }));
  }
}
