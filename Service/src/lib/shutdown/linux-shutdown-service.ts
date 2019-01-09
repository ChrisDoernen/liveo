import { injectable, inject } from "inversify";
import { Logger } from "./../util/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { IShutdownService } from "./i-shutdown-service";
import { Scheduler } from "../scheduling/scheduler";

/**
 * Linux implementation for IShutdownService
 */
@injectable()
export class LinuxShutdownService implements IShutdownService {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
        @inject("Scheduler") private _scheduler: Scheduler) { }

    public shutdown(): void {
        this._logger.info("Shutting down server now.");
        this._processExecutionService.execute("shutdown now");
    }

    public scheduleShutdown(time: Date): void {
        this._scheduler.schedule(time, this.shutdown);
    }

    public unscheduleShutdown(): void {
        throw new Error("Method not implemented.");
    }
}
