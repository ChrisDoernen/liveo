import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { ActivityEntity, SessionEntity, StreamEntity, ActivationEntity, ActivationState } from "@live/entities";
import { ActivationService } from "../activation/activation-service";
import { TimeService } from "../time/time.service";

/**
 * Provides the servers activity, e.g. the activation, session entity and streams entities
 */
@injectable()
export class ActivityService {

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("TimeService") private _timeService: TimeService,
    @inject("ActivationService") private _activationService: ActivationService,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("StreamService") private _streamService: StreamService) {
  }

  private currentTimestamp = Date.now() / 1000;

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
    const now = this._timeService.now();

    if (activation) {
      if (activation.startTime > now) {
        activationState = ActivationState.Scheduled;
      } else if (activation.startTime < now && activation.endTime > now) {
        activationState = ActivationState.Started;
      } else if (activation.startTime < now && activation.endTime < now) {
        activationState = ActivationState.Ended;
      }
    } else {
      activationState = ActivationState.NoActivation;
    }

    return activationState;
  }
}
