import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";

/**
 * ShutdownService to kill the current process
 */
@injectable()
export class ProcessShutdownService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger) {
    super(logger);
    logger.debug("Instantiating process shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.info("Shutting down, killing process.");
    process.exit(0);
  }
}
