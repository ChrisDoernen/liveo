import { OnDestroy, Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ENDPOINTS, EVENTS } from "@live/constants";

@Injectable({
  providedIn: "root"
})
export class WebsocketService extends Socket implements OnDestroy {
  constructor() {
    super({ url: ENDPOINTS.root, options: { reconnectionAttempts: 6, path: ENDPOINTS.websocket } });
  }

  public initializeConnection(): void {
    this.on("connect", this.emit(EVENTS.subscribeAdmin));
    console.debug("Subscribe to admin.");
  }

  public ngOnDestroy(): void {
    this.emit(EVENTS.unsubscribeAdmin);
    console.debug("Unsubscribe to admin.");
  }
}