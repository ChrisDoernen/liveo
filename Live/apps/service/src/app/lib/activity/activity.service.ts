import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { ActivityEntity, SessionEntity, StreamEntity, ActivationEntity, ActivationState } from "@live/entities";
import { ActivationService } from "../activation/activation-service";

/**
 * Provides the servers activity, e.g. the activation, session entity and streams entities
 */
@injectable()
export class ActivityService {

  constructor(@inject("Logger") private _logger: Logger,
    @inject("ActivationService") private _activationService: ActivationService,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("StreamService") private _streamService: StreamService) {
  }

  public getActivity(): ActivityEntity {
    const activation = this._activationService.getActivationEntity();
    let session: SessionEntity;
    let streams: StreamEntity[];

    if (activation) {
      session = this._sessionService.getSessionEntity(activation.sessionId);
      streams = session.streams.map((streamId) => this._streamService.getStreamEntity(streamId));
    }

    const activationState = this.determineActivationState(activation, session);

    return new ActivityEntity(activationState, activation, session, streams);
  }

  private determineActivationState(activation: ActivationEntity, session: SessionEntity): ActivationState {
    let activationState: ActivationState;

    if (activation) {
      if (activation.timeStarting > Date.now()) {
        activationState = ActivationState.ActivatedSessionScheduled;
      } else if (session.timeStarted < Date.now()) {
        activationState = ActivationState.ActivatedSessionStarted;
      } else if (session.timeEnded < Date.now()) {
        activationState = ActivationState.ActivatedSessionEnded;
      }
    } else {
      activationState = ActivationState.NoActivation;
    }

    return activationState;
  }
}
