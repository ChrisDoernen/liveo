import { inject, injectable } from "inversify";
import { SessionService } from "../sessions/session-service";
import { SessionEntity } from "../sessions/session.entity";
import { Session } from "../sessions/session";
import { ActivationRequest } from "./activation-request";
import { Logger } from "../util/logger";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "../shutdown/shutdown-service";
import { Shutdown } from "../shutdown/shutdown";

@injectable()
export class ActivationService {

    private _activeSession: Session;

    public get activeSessionEntity(): SessionEntity {
        return this._activeSession ? this._activeSession.entity : undefined;
    }

    private _sessionStartJobId: string = "SESSION_START_JOB";
    private _sessionStopJobId: string = "SESSION_STOP_JOB";

    constructor(@inject("Logger") private _logger: Logger,
        @inject("SessionService") private _sessionService: SessionService,
        @inject("Scheduler") private _scheduler: Scheduler,
        @inject("ShutdownService") private _shutdownService: ShutdownService) {
    }

    public activateSession(activationRequest: ActivationRequest): void {

        this.validateActivationRequest(activationRequest);

        this._activeSession = this._sessionService.getSession(activationRequest.sessionId);

        if (activationRequest.timeStarting) {
            this._scheduler.schedule(this._sessionStartJobId, activationRequest.timeStarting, this._activeSession.start);
        } else {
            this._activeSession.start();
        }

        if (activationRequest.timeEnding) {
            this._scheduler.schedule(this._sessionStopJobId, activationRequest.timeEnding, this._activeSession.stop);
        }

        if (activationRequest.timeServerShutdown) {
            this._shutdownService.setShutdown(new Shutdown(activationRequest.timeServerShutdown));
        }

        this._logger.info(`Activated session ${this._activeSession.id}.`);
    }

    private validateActivationRequest(activationRequest: ActivationRequest): void {
        if (!activationRequest.sessionId) {
            throw new Error("Session id in activation request is null.");
        }

        if (activationRequest.timeEnding < activationRequest.timeStarting) {
            throw new Error("Time ending is lower than time starting in activation request.");
        }

        if (activationRequest.timeServerShutdown < activationRequest.timeEnding) {
            throw new Error("Time server shutdown is lower than time ending in activation request.");
        }
    }

    public deactivateSession(): void {
        if (!this._activeSession) {
            throw new Error("No session was activated.");
        }

        this._activeSession.stop();
        this._activeSession = null;
    }
}
