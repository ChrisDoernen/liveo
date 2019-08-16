import { injectable, inject } from "inversify";
import { WebsocketServer } from "../core/websocket-server";
import { NotificationEntity } from "@live/entities";
import { EVENTS } from "@live/constants";

@injectable()
export class NotificationService {
  constructor(
    @inject("WebsocketServer") private _websocketServer: WebsocketServer) {
  }

  public sendNotification(notification: NotificationEntity): void {
    this._websocketServer.emitAdminEventMessage(EVENTS.adminNotification, notification);
  }
}
