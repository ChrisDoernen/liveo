import { injectable, inject } from "inversify";
import { Logger } from "../../util/logger";
import { ProcessdExecutionService } from "../child-processes/process-execution-service";

/**
 * Linux implementation for IShutdownService
 */
@injectable()
export class LinuxShutdownService {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessdExecutionService) { }

    public shutdown(): void {
        this._logger.info("Shutting down server now.");
        this._processExecutionService.execute("shutdown now");
    }
}
