import { EVENTS } from "@liveo/constants";
import { ActivationEntity, ActivationState, ActivationStateEntity, SessionEntity, StreamEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { AdminGateway } from "../../gateways/admin.gateway";
import { Logger } from "../../modules/core/services/logging/logger";
import { SessionService } from "../../modules/sessions/services/sessions/session.service";
import { Scheduler } from "../../modules/shared/services/scheduling/scheduler";
import { TimeService } from "../../modules/shared/services/time/time.service";
import { StreamsService } from "../../modules/streams/services/streams/streams.service";

/**
 * Provides the activation state, e.g. the activation, session entity and streams entities
 */
@Injectable()
export class ActivationStateService {

  private _activationStateSessionStartedJobId: string;
  private _activationStateSessionEndedJobId: string;
  private _activationStateShutdownJobId: string;

  private noActivation = new ActivationStateEntity("NoActivation");
  private _activationState$ = new BehaviorSubject<ActivationStateEntity>(this.noActivation);
  public activationState$ = this._activationState$.asObservable();

  constructor(
    private readonly _logger: Logger,
    private readonly _sessionService: SessionService,
    private readonly _streamService: StreamsService,
    private readonly _scheduler: Scheduler,
    private readonly _timeService: TimeService,
    private readonly _adminGateway: AdminGateway) {
  }

  public newActivation(activation: ActivationEntity) {
    this.initializeApplicationState(activation);

    if (activation.startTime) {
      this._activationStateSessionStartedJobId =
        this._scheduler.schedule(new Date(activation.startTime), () => this.activationStateChange("Started"));
      this.activationStateChange("Scheduled");
    } else {
      activation.startTime = new Date(this._timeService.now()).toISOString();
      this.activationStateChange("Started");
    }

    if (activation.endTime) {
      this._activationStateSessionEndedJobId =
        this._scheduler.schedule(new Date(activation.endTime), () => this.activationStateChange("Ended"));
    }

    if (activation.shutdownTime) {
      this._activationStateShutdownJobId =
        this._scheduler.schedule(new Date(activation.shutdownTime), () => this.activationStateChange("Ended"));
    }
  }

  public deleteActivation(activation: ActivationEntity) {
    const now = this._timeService.now();

    if (activation.startTime && new Date(activation.startTime) > now) {
      this._scheduler.cancelJob(this._activationStateSessionStartedJobId);
    }

    if (activation.endTime && new Date(activation.endTime) > now) {
      this._scheduler.cancelJob(this._activationStateSessionEndedJobId);
    }

    if (activation.shutdownTime) {
      this._scheduler.cancelJob(this._activationStateShutdownJobId);
    }

    this.activationStateChange("NoActivation");
  }

  public initializeApplicationState(activation: ActivationEntity): void {
    let session: SessionEntity;
    let streams: StreamEntity[];

    if (activation) {
      session = this._sessionService.getSessionEntity(activation.sessionId);
      streams = session.streams.map((streamId) => this._streamService.getStreamEntity(streamId));
    }

    this._activationState$.next(new ActivationStateEntity(null, activation, session, streams));
  }

  private activationStateChange(newState: ActivationState): void {
    const newActivationState = this._activationState$.value;
    newActivationState.state = newState;
    if (newState === "NoActivation") {
      newActivationState.session = null;
      newActivationState.streams = null;
    }
    this._activationState$.next(newActivationState);

    this._adminGateway.emit(EVENTS.adminActivationStateUpdate, newActivationState);
    this._logger.debug(`Emitting new activation state: ${newActivationState.state}`);
  }

  public getActivationState(): ActivationStateEntity {
    return this._activationState$.value;
  }
}
