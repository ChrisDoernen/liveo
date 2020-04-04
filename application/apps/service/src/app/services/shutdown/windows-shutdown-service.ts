import { inject, injectable } from "inversify";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { ShutdownService } from "./shutdown-service";

/**
 * Windows implementation for ShutdownService
 */
@injectable()
export class WindowsShutdownService extends ShutdownService {

  constructor(@inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
    @inject("ActivationStateService") _activationStateService: ActivationStateService) {
    super(logger, _activationStateService);
    logger.debug("Instantiating windows shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.debug("Shutting down server now.");
    this._processExecutionService.execute("shutdown \s");
  }
}
