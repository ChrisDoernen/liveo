import { injectable, inject } from "inversify";
import { Logger } from "./../util/logger";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService {

    constructor(@inject("Logger") private _logger: Logger) { }

    public shutdown(): void {
        this._logger.info("Simulating shutdown in development environment.");
    }
}
