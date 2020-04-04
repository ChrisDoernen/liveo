import { inject, injectable } from "inversify";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ShutdownService } from "./shutdown-service";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ActivationStateService") _activationStateService: ActivationStateService) {
    super(logger, _activationStateService);
    logger.debug("Instantiating shutdown simulation service.");
  }

  public executeShutdown(): void {
    this.logger.debug("Simulating server shutdown in development environment");
  }
}
