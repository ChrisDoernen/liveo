import { NotificationEntity, NotificationType, SessionEntity } from "@live/entities";
import { inject } from "inversify";
import { Logger } from "../logging/logger";
import { NotificationService } from "../notifications/notification-service";
import { Stream } from "../streams/stream";

/**
 * Class representing a streaming session
 */
export class Session {
  private _isStarted = false;

  public get entity(): SessionEntity {
    return this._sessionEntity;
  }

  public get id(): string {
    return this._sessionEntity.id;
  }

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("NotificationService") private readonly _notificationService: NotificationService,
    private readonly _sessionEntity: SessionEntity,
    private _streams: Stream[]) {
    this._logger.debug(`Instantiated session ${JSON.stringify(_sessionEntity)}`);
  }

  public start(): void {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;
    const notification = new NotificationEntity("Session started", NotificationType.Info);
    this._notificationService.sendNotification(notification);
  }

  public stop(): void {
    if (!this._isStarted) {
      return;
    }

    this._isStarted = false;
    const notification = new NotificationEntity("Session ended", NotificationType.Info);
    this._notificationService.sendNotification(notification);
  }
}
