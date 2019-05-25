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

  constructor(
    @inject("Logger") private _logger: Logger,
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

    const activationState = this.determineActivationState(activation);

    return new ActivityEntity(activationState, activation, session, streams);
  }

  private determineActivationState(activation: ActivationEntity): ActivationState {
    let activationState: ActivationState;

    if (activation) {
      if (activation.startTime > Date.now()) {
        activationState = ActivationState.Scheduled;
      } else if (activation.startTime < Date.now()) {
        activationState = ActivationState.Started;
      } else if (activation.endTime < Date.now()) {
        activationState = ActivationState.Ended;
      }
    } else {
      activationState = ActivationState.NoActivation;
    }

    return activationState;
  }
}
