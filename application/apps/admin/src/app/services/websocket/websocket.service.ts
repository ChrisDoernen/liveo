import { Injectable, OnDestroy } from "@angular/core";
import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { Logger } from "@liveo/services";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root"
})
export class WebsocketService extends Socket implements OnDestroy {

  constructor(
    private readonly _logger: Logger
  ) {
    super({ url: ENDPOINTS.root, options: { reconnectionAttempts: 3, path: ENDPOINTS.websocket } });
  }

  public initializeConnection(): void {
    this.emit(EVENTS.subscribeAdmin);
    this._logger.info("Subscribe to admin");
  }

  public reconnect(): void {
    this.ioSocket.open();
  }

  public ngOnDestroy(): void {
    this.emit(EVENTS.unsubscribeAdmin);
    this._logger.info("Unsubscribe to admin");
  }
}