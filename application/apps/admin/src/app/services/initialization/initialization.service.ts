import { Injectable } from "@angular/core";
import { Logger } from "@liveo/services";
import { ConnectionStateService } from "../connection-state/connection-state-service";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(
    private _logger: Logger,
    private _connectionStateService: ConnectionStateService) {
  }

  public initialize(): void {
    this._logger.info("Initializing...");
    this._connectionStateService.checkConnectionState();
  }
}
