import { ActivationService } from "../activation/activation.service";
import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket/websocket.service";
import { NotificationService } from "../notification/notification.service";
import { SessionService } from "../session/session.service";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(
    private _activationService: ActivationService,
    private _websocketService: WebsocketService,
    private _notificationService: NotificationService,
    private _sessionService: SessionService) {
  }

  public initialize(): void {
    this._activationService.getActivation();
    this._websocketService.initializeConnection();
    this._notificationService.subscribeToServerNotifications();
    this._sessionService.subscribeToActivations();
  }
}