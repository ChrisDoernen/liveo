import { Injectable } from "@angular/core";
import { EVENTS } from "@liveo/constants";
import { NotificationEntity } from "@liveo/entities";
import { Logger } from "@liveo/services";
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "../websocket/websocket.service";

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
