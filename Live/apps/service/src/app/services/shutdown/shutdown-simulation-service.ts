import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService extends ShutdownService {

  constructor(@inject("Logger") logger: Logger) {
    super(logger);
    logger.debug("Instantiating shutdown simulation service.");
  }

  public executeShutdown(): void {
    this.logger.debug("Simulating server shutdown in development environment");
  }
}
