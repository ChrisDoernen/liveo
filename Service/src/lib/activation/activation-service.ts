import { inject, injectable } from "inversify";
import { SessionService } from "../sessions/session-service";
import { Activation } from "./activation";
import { Logger } from "../util/logger";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "../shutdown/shutdown-service";
import { Shutdown } from "../shutdown/shutdown";

@injectable()
export class ActivationService {

    private _activation: Activation;

    private _sessionStartJobId: string = "SESSION_START_JOB";
    private _sessionStopJobId: string = "SESSION_STOP_JOB";

    constructor(@inject("Logger") private _logger: Logger,
        @inject("SessionService") private _sessionService: SessionService,
        @inject("Scheduler") private _scheduler: Scheduler,
        @inject("ShutdownService") private _shutdownService: ShutdownService) {
    }

    public setActivation(activation: Activation): void {
        this._logger.info(`Received new activation${JSON.stringify(activation)}.`);

        if (this._activation) {
            throw new Error("Can not set new activation before deleting the current.");
        }

        this.validateActivation(activation);

        const session = this._sessionService.getSession(activation.sessionId);

        if (activation.timeStarting) {
            this._scheduler.schedule(this._sessionStartJobId, new Date(activation.timeStarting), session.start);
        } else {
            session.start();
        }

        if (activation.timeEnding) {
            this._scheduler.schedule(this._sessionStopJobId, new Date(activation.timeEnding), session.stop);
        }

        if (activation.timeServerShutdown) {
            this._shutdownService.setShutdown(new Shutdown(activation.timeServerShutdown));
        }

        this._activation = activation;
    }

    private validateActivation(activation: Activation): void {
        if (!activation.sessionId) {
            throw new Error("Session id in activation is null.");
        }

        if (activation.timeEnding < activation.timeStarting) {
            throw new Error("Time ending is lower than time starting in activation.");
        }

        if (activation.timeServerShutdown < activation.timeEnding) {
            throw new Error("Time server shutdown is lower than time ending in activation.");
        }
    }

    public deleteActivation(): void {
        if (!this._activation) {
            throw new Error("Can not delete activation, no activation existing.");
        }

        if (this._activation.timeStarting && this._activation.timeStarting > Date.now()) {
            this._scheduler.cancelJob(this._sessionStartJobId);
        } else {
            const session = this._sessionService.getSession(this._activation.sessionId);
            session.stop();
        }

        if (this._activation.timeEnding && this._activation.timeEnding > Date.now()) {
            this._scheduler.cancelJob(this._sessionStopJobId);
        }

        if (this._activation.timeServerShutdown) {
            this._shutdownService.cancelShutdown();
        }

        this._activation = null;
        this._logger.info("Activation deleted.");
    }

    public getActivation(): Activation {
        return this._activation;
    }
}
