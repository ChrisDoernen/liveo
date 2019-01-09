import { injectable, inject } from "inversify";
import { Logger } from "./../util/logger";
import { IShutdownService } from "./i-shutdown-service";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService implements IShutdownService {

    constructor(@inject("Logger") private _logger: Logger) { }

    public shutdown(): void {
        this._logger.info("Simulating shutdown in development environment.");
    }

    public scheduleShutdown(time: Date): void {
        this._logger.info(`Simulating scheduling shutdown for ${time} in development environment.`);
    }

    public unscheduleShutdown(): void {
        this._logger.info("Simulating unscheduling shutdown in development environment.");
    }
}
