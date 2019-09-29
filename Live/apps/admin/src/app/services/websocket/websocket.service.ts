import { OnDestroy, Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ENDPOINTS, EVENTS } from "@live/constants";
import { Logger } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class WebsocketService extends Socket implements OnDestroy {
  constructor(
    private _logger: Logger) {
    super({ url: ENDPOINTS.root, options: { reconnectionAttempts: 3, path: ENDPOINTS.websocket } });
  }

  public initializeConnection(): void {
    this.on("connect", () => this.emit(EVENTS.subscribeAdmin));
    this._logger.info("Subscribe to admin.");
  }

  public reconnect(): void {
    this.ioSocket.open();
  }

  public ngOnDestroy(): void {
    this.emit(EVENTS.unsubscribeAdmin);
    this._logger.info("Unsubscribe to admin.");
  }
}