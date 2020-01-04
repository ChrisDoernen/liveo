import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";
import { Scheduler } from "../scheduling/scheduler";

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
    this.logger.debug("Simulating server shutdown in development environment");
  }
}
