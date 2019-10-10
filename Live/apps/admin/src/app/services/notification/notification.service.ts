import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EVENTS } from "@live/constants";
import { WebsocketService } from "../websocket/websocket.service";
import { NotificationEntity } from "@live/entities";
import { Logger } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  private notifications: Subject<NotificationEntity> = new Subject<NotificationEntity>();

  public notifications$: Observable<NotificationEntity> = this.notifications.asObservable();

  constructor(
    private _logger: Logger,
    private _websocketService: WebsocketService) {
  }

  public subscribeServerNotifications(): void {
    this._logger.info("Start getting notifications.");
    this._websocketService.fromEvent<NotificationEntity>(EVENTS.adminNotification)
      .subscribe((notification: NotificationEntity) => {
        this._logger.info(`Got new server notification: ${JSON.stringify(notification)}.`);
        this.notifications.next(notification);
      });
  }
}
