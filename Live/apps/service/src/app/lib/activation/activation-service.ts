import { inject, injectable } from "inversify";
import { SessionService } from "../sessions/session-service";
import { ActivationEntity } from "@live/entities";
import { Logger } from "../logging/logger";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "../shutdown/shutdown-service";
import { Shutdown } from "@live/entities";
import { TimeService } from "../time/time.service";

@injectable()
export class ActivationService {
  private _activation: ActivationEntity;
  private _sessionStartJobId = "SESSION_START_JOB";
  private _sessionStopJobId = "SESSION_STOP_JOB";

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("Scheduler") private _scheduler: Scheduler,
    @inject("ShutdownService") private _shutdownService: ShutdownService,
    @inject("TimeService") private _timeService: TimeService) {
  }

  public setActivation(activation: ActivationEntity): ActivationEntity {
    this._logger.info(`Received new activation: ${JSON.stringify(activation)}.`);

    if (this._activation) {
      throw new Error("Can not set new activation before deleting the current.");
    }

    this.validateActivation(activation);

    const session = this._sessionService.getSession(activation.sessionId);

    if (!session.hasValidStreams) {
      throw new Error(`Can not set activation: All streams of session ${session.id} have invalid devices.`);
    }

    if (activation.startTime) {
      this._scheduler.schedule(this._sessionStartJobId, activation.startTime, () => session.start());
    } else {
      session.start();
      activation.startTime = this._timeService.now();
    }

    if (activation.endTime) {
      this._scheduler.schedule(this._sessionStopJobId, activation.endTime, () => session.stop());
    }

    if (activation.shutdownTime) {
      this._shutdownService.setShutdown(new Shutdown(activation.shutdownTime));
    }

    this._activation = activation;
    this._logger.debug("Activation set.");

    return this._activation;
  }

  private validateActivation(activation: ActivationEntity): void {
    if (!activation.sessionId) {
      throw new Error("Activation validation error: Session id is null.");
    }

    if (activation.startTime && activation.startTime < this._timeService.now()) {
      throw new Error("Activation validation error: The start time is not in the future.");
    }

    if (activation.endTime && activation.endTime < activation.startTime) {
      throw new Error("Activation validation error: Time ending is lower than time starting.");
    }

    if (activation.shutdownTime && activation.shutdownTime < activation.endTime) {
      throw new Error("Activation validation error: Time server shutdown is lower than time ending.");
    }
  }

  public deleteActivation(): ActivationEntity {
    if (!this._activation) {
      throw new Error("Can not delete activation, no activation existing.");
    }

    const now = this._timeService.now();

    if (this._activation.startTime && this._activation.startTime > now) {
      this._scheduler.cancelJob(this._sessionStartJobId);
    } else {
      const session = this._sessionService.getSession(this._activation.sessionId);
      session.stop();
    }

    if (this._activation.endTime && this._activation.endTime > now) {
      this._scheduler.cancelJob(this._sessionStopJobId);
    }

    if (this._activation.shutdownTime) {
      this._shutdownService.cancelShutdown();
    }

    this._activation = null;
    this._logger.info("Activation deleted.");

    return this._activation;
  }

  public getActivationEntity(): ActivationEntity {
    return this._activation;
  }
}
