import { inject, injectable } from "inversify";
import { SessionService } from "../sessions/session-service";
import { SessionEntity } from "../sessions/session.entity";
import { Session } from "../sessions/session";
import { ActivationRequest } from "./activation-request";
import { Logger } from "../util/logger";

@injectable()
export class ActivationService {

    private _activeSession: Session;

    public get activeSessionEntity(): SessionEntity {
        return this._activeSession ? this._activeSession.entity : undefined;
    }

    constructor(@inject("Logger") private _logger: Logger,
        @inject("SessionService") private _sessionService: SessionService) {
    }

    public activateSession(activationRequest: ActivationRequest): void {
        this._activeSession = this._sessionService.getSession(activationRequest.sessionId);
        this._logger.info(`Activated session ${this._activeSession.id}.`);
    }

    public resetActivatedSession(): void {
        this._activeSession = null;
        this._logger.info("Active session was reset.");
    }

    public deactivateSession(): void {
        if (!this._activeSession) {
            throw new Error("No session was activated.");
        }

        this._activeSession.stop();
    }
}
