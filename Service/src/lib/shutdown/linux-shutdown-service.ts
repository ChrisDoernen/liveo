import { injectable, inject } from "inversify";
import { Logger } from "./../util/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownService } from "./shutdown-service";

/**
 * Linux implementation for ShutdownService
 */
@injectable()
export class LinuxShutdownService extends ShutdownService {

    constructor(@inject("Logger") logger: Logger,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
        @inject("Scheduler") scheduler: Scheduler) {
        super(logger, scheduler);
    }

    public executeShutdown(): void {
        this.logger.info("Shutting down server now.");
        this._processExecutionService.execute("shutdown now");
    }
}
