import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EVENTS } from "@live/constants";
import { WebsocketService } from "../websocket/websocket.service";
import { NotificationEntity } from "@live/entities";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  private notifications: Subject<NotificationEntity> = new Subject<NotificationEntity>();

  public notifications$: Observable<NotificationEntity> = this.notifications.asObservable();

  constructor(
    private _websocketService: WebsocketService) {
  }

  public getServerNotifications(): void {
    console.log("Start getting notifications.");
    this._websocketService.fromEvent<NotificationEntity>(EVENTS.adminNotification)
      .subscribe((notification: NotificationEntity) => {
        console.log(`Got new server notification: ${JSON.stringify(notification)}.`);
        this.notifications.next(notification);
      });
  }
}
