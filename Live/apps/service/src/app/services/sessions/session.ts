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

  /**
   * Indicates wether at least one stream of the session
   * has a valid device and can be started.
   */
  private _hasValidStream = false;

  public get hasValidStreams(): boolean {
    return this._hasValidStream;
  }

  public get entity(): SessionEntity {
    return this._sessionEntity;
  }

  public get id(): string {
    return this._sessionEntity.id;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("NotificationService") private _notificationService: NotificationService,
    private _sessionEntity: SessionEntity,
    private _streams: Stream[]) {
    this._logger.debug(`Instantiated session ${JSON.stringify(_sessionEntity)}`);
    this.checkStreamDevices();
  }

  private checkStreamDevices(): void {
    this._hasValidStream = false;

    for (const stream of this._streams) {
      if (stream.hasValidDevice) {
        this._hasValidStream = true;
        return;
      }
    }

    this._logger.warn(`All streams of session ${this.id} have invalid devices. Session can not be activated.`);
  }

  public start(): void {
    if (!this._isStarted) {
      if (!this._hasValidStream) {
        throw new Error(`Cannot start session ${this.id}: All streams have invalid devices.`);
      }

      this._logger.info(`Starting session ${this.id}`);
      this._streams.forEach(stream => stream.start());
      const notification = new NotificationEntity("Started streaming", NotificationType.Info);
      this._notificationService.sendNotification(notification);
      this._isStarted = true;
    } else {
      this._logger.warn(`Session ${this.id} is already started`);
    }
  }

  public stop(): void {
    if (this._isStarted) {
      this._logger.info(`Stopping session ${this.id}`);
      this._streams.forEach(stream => stream.stop());
      const notification = new NotificationEntity("Stopped streaming", NotificationType.Info);
      this._notificationService.sendNotification(notification);
      this._isStarted = false;
    }
  }
}
