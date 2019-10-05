import { Injectable } from "@angular/core";
import { Logger } from "@live/services";
import { ActivationService } from "../activation/activation.service";
import { ConnectionStateService } from "../connection-state/connection-state-service";
import { NotificationService } from "../notification/notification.service";
import { SessionService } from "../session/session.service";
import { SettingsService } from "../settings/settings.service";
import { SystemMonitoringService } from "../system-monitoring/system-monitoring.service";
import { WebsocketService } from "../websocket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(
    private _logger: Logger,
    private _connectionStateService: ConnectionStateService,
    private _activationService: ActivationService,
    private _websocketService: WebsocketService,
    private _notificationService: NotificationService,
    private _sessionService: SessionService,
    private _settingsService: SettingsService,
    private _systemMonitoringService: SystemMonitoringService) {
  }

  public initialize(): void {
    this._logger.info("Initializing...");
    this._connectionStateService.checkConnectionState();
    this._activationService.getActivation();
    this._sessionService.subscribeToActivations();
    this._websocketService.initializeConnection();
    this._settingsService.getSettings();

    // These are actually subscriptions on events from the websocket client
    this._notificationService.subscribeServerNotifications();
    this._systemMonitoringService.subscribeCpuUsage();
  }
}
