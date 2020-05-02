import { Injectable } from "@angular/core";
import { Logger } from "@liveo/services";
import { Store } from "@ngxs/store";
import { DetectDevicesAction } from "../../actions/devices.actions";
import { GetSessionsAction } from "../../actions/sessions.actions";
import { GetStreamsAction } from "../../actions/streams.actions";
import { ConnectionStateService } from "../connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(
    private readonly _logger: Logger,
    private readonly _connectionStateService: ConnectionStateService,
    private readonly _store: Store
  ) {
  }

  public initialize(): void {
    this._logger.info("Initializing...");
    this._store.dispatch(new DetectDevicesAction());
    this._store.dispatch(new GetStreamsAction());
    this._store.dispatch(new GetSessionsAction());
    this._connectionStateService.checkConnectionState();
  }
}
