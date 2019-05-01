import { inject, injectable } from "inversify";
import { SessionService } from "../sessions/session-service";
import { ActivationEntity } from "@live/entities";
import { Logger } from "../logging/logger";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "../shutdown/shutdown-service";
import { Shutdown } from "@live/entities";

@injectable()
export class ActivationService {
  private _activation: ActivationEntity;
  private _sessionStartJobId = "SESSION_START_JOB";
  private _sessionStopJobId = "SESSION_STOP_JOB";

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("Scheduler") private _scheduler: Scheduler,
    @inject("ShutdownService") private _shutdownService: ShutdownService) {
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

    if (activation.timeStarting) {
      this._scheduler.schedule(this._sessionStartJobId, new Date(activation.timeStarting), session.start);
    } else {
      session.start();
    }

    if (activation.timeEnding) {
      this._scheduler.schedule(this._sessionStopJobId, new Date(activation.timeEnding), session.stop);
    }

    if (activation.timeServerShutdown) {
      this._shutdownService.setShutdown(
        new Shutdown(activation.timeServerShutdown)
      );
    }

    this._activation = activation;
    this._logger.debug("Activation set");

    return this._activation;
  }

  private validateActivation(activation: ActivationEntity): void {
    if (!activation.sessionId) {
      throw new Error("Activation validation error: Session id is null.");
    }

    if (activation.timeEnding < activation.timeStarting) {
      throw new Error("Activation validation error: Time ending is lower than time starting.");
    }

    if (activation.timeServerShutdown < activation.timeEnding) {
      throw new Error("Activation validation error: Time server shutdown is lower than time ending.");
    }
  }

  public deleteActivation(): void {
    if (!this._activation) {
      throw new Error("Can not delete activation, no activation existing.");
    }

    if (
      this._activation.timeStarting &&
      this._activation.timeStarting > Date.now()
    ) {
      this._scheduler.cancelJob(this._sessionStartJobId);
    } else {
      const session = this._sessionService.getSession(
        this._activation.sessionId
      );
      session.stop();
    }

    if (
      this._activation.timeEnding &&
      this._activation.timeEnding > Date.now()
    ) {
      this._scheduler.cancelJob(this._sessionStopJobId);
    }

    if (this._activation.timeServerShutdown) {
      this._shutdownService.cancelShutdown();
    }

    this._activation = null;
    this._logger.info("Activation deleted.");
  }

  public getActivation(): ActivationEntity {
    return this._activation;
  }
}
