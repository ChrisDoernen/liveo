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
        const autostart = autostartData.autostart;
        const sessionId = autostartData.sessionId;

        if (autostart && sessionId) {
            try {
                this._logger.info(`Autostart session ${sessionId}.`);
                this._sessionService.activateSession(autostartData.sessionId);
                this._sessionService.startActiveSession();
            } catch (error) {
                this._logger.warn(`Could not autostart session ${sessionId}: ${error}.`);
            }
        }
    }
}
