import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "./shutdown-service";

/**
 * ShutdownService that exits current process instead of shutting down the machine
 */
@injectable()
export class ProcessShutdownService extends ShutdownService {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
    @inject("Scheduler") scheduler: Scheduler) {
    super(logger, scheduler);
    logger.debug("Instantiating process shutdown service.");
  }

  public executeShutdown(): void {
    this.logger.info("Shutting down process now.");
    process.exit(0);
  }
}
