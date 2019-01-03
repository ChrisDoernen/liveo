import { inject, injectable } from "inversify";
import { Logger } from "../util/logger";
import { DataService } from "../data/data-service";
import { SessionService } from "../sessions/session-service";

@injectable()
export class AutostartService {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("DataService") private _dataService: DataService,
        @inject("SessionService") private _sessionService: SessionService) {
    }

    public autoStart(): void {
        const autostartData = this._dataService.loadAutostartData();
        const sessionId = autostartData.autoactivate;

        if (sessionId) {
            try {
                this._logger.info(`Auto-activating session ${sessionId}.`);
                this._sessionService.activateSession(sessionId);
            } catch (error) {
                this._logger.warn(`Could not auto-activate session ${sessionId}: ${error}.`);
            }
        }

        const autostart = autostartData.autostart;

        if (autostart) {
            try {
                this._sessionService.startActiveSession();
            } catch (error) {
                this._logger.warn(`Could not auto-start session ${sessionId}: ${error}.`);
            }
        }
    }
}
