import { ApplicationStateEntity, SessionEntity, StreamEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { ActivationService } from "../activation/activation-service";
import { Logger } from "../logging/logger";
import { SessionService } from "../sessions/session-service";
import { StreamService } from "../streams/stream-service";

/**
 * Provides the activation state, e.g. the activation, session entity and streams entities
 */
@injectable()
export class ApplicationStateService {

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("ActivationService") private _activationService: ActivationService,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("StreamService") private _streamService: StreamService) {
  }

  public getApplicationState(): ApplicationStateEntity {
    const activation = this._activationService.getActivationEntity();
    let session: SessionEntity;
    let streams: StreamEntity[];

    if (activation) {
      session = this._sessionService.getSessionEntity(activation.sessionId);
      streams = session.streams.map((streamId) => this._streamService.getStreamEntity(streamId));
    }

    return new ApplicationStateEntity(activation, session, streams);
  }
}
