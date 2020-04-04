import { inject, injectable } from "inversify";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";

/**
 * ShutdownService to kill the current process
 */
@injectable()
export class ProcessShutdownService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ActivationStateService") _activationStateService: ActivationStateService) {
    super(logger, _activationStateService);
    logger.debug("Instantiating process shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.info("Shutting down, killing process.");
    process.exit(0);
  }
}
