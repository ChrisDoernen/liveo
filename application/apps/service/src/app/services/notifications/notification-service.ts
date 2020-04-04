import { EVENTS } from "@liveo/constants";
import { NotificationEntity } from "@liveo/entities";
import { inject, injectable } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";

@injectable()
export class NotificationService {
  constructor(
    @inject("WebsocketServer") private _websocketServer: WebsocketServer) {
  }

  public sendNotification(notification: NotificationEntity): void {
    this._websocketServer.emitAdminEventMessage(EVENTS.adminNotification, notification);
  }
}
