import { injectable } from "inversify";
import { Logger } from "../../util/logger";
import { ProcessdExecutionService } from "../child-processes/process-execution-service";

/**
 * Linux implementation for IShutdownService
 */
@injectable()
export class LinuxShutdownService {

    constructor(private logger: Logger,
        private commandExecutionService: ProcessdExecutionService) { }

    /** @inheritdoc */
    public shutdown(): void {
        this.logger.info("Shutting down server now.");
        this.commandExecutionService.execute("shutdown now");
    }
}
