import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";

/**
 * ShutdownService that exits current process instead of shutting down the machine
 */
@injectable()
export class ProcessShutdownService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger) {
    super(logger);
    logger.debug("Instantiating process shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.debug("Shutting down process now.");
    process.exit(0);
  }
}
