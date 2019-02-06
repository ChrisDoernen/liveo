import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";
import { Scheduler } from "../scheduling/scheduler";
import { ProcessExecutionService } from "../process-execution/process-execution-service";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService extends ShutdownService {

    constructor(@inject("Logger") logger: Logger,
        @inject("Scheduler") scheduler: Scheduler) {
        super(logger, scheduler);
        logger.debug("Instantiating shutdown simulation service.");
    }

    public executeShutdown(): void {
        this.logger.info("Simulating server shutdown in development environment");
    }
}
