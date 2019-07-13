import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ENDPOINTS, EVENTS } from "@live/constants";

@Injectable({
  providedIn: "root"
})
export class WebsocketService extends Socket {
  constructor() {
    super({ url: ENDPOINTS.root, options: { reconnectionAttempts: 6, path: ENDPOINTS.websocket } });
    this.on("connect", this.subscribeToAdmin.bind(this));
  }

  public subscribeToAdmin(): void {
    this.emit(EVENTS.subscribeAdmin);
    console.debug("Subscribe to admin");
  }
}