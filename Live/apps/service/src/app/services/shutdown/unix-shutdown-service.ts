import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "./shutdown-service";

/**
 * Unix implementation for ShutdownService
 */
@injectable()
export class UnixShutdownService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
    @inject("Scheduler") scheduler: Scheduler) {
    super(logger, scheduler);
    logger.debug("Instantiating unix shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.debug("Shutting down server now.");
    this._processExecutionService.execute("sudo shutdown -h now");
  }
}
