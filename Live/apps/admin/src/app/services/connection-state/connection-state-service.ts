import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { EndpointService } from "@live/services";
import { HttpClient } from "@angular/common/http";
import { ConnectionState } from "./connection-state";
import { LifecycleState } from "./lifecycle-state";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class ConnectionStateService {

  private _connectionState = new ReplaySubject<ConnectionState>();

  public connectionState$ = this._connectionState.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _endpointService: EndpointService) {
  }

  private emitConnectionState(connectionState: ConnectionState) {
    console.log(`Emitting connection state: ${JSON.stringify(connectionState)}.`);
    this._connectionState.next(connectionState);
  }

  public checkConnectionState(lifecycleState: LifecycleState): void {
    this._httpClient.get(this._endpointService.getEndpoint(`connection`), { responseType: "text" }).toPromise()
      .then(() => this.emitConnectionState({ online: true, lifecycleState: lifecycleState }))
      .catch((error) => this.emitConnectionState({ online: false, lifecycleState: lifecycleState }));
  }
}
