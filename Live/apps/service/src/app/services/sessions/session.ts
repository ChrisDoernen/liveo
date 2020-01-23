import { SessionEntity } from "@live/entities";
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
    @inject("Logger") private _logger: Logger,
    @inject("NotificationService") private _notificationService: NotificationService,
    private _sessionEntity: SessionEntity,
    private _streams: Stream[]) {
    this._logger.debug(`Instantiated session ${JSON.stringify(_sessionEntity)}`);
  }

  public start(): void {
    this._isStarted = true;
  }

  public stop(): void {
    this._isStarted = false;
  }
}
