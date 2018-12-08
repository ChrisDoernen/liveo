import { injectable } from "inversify";
import { Logger } from "../../util/logger";
import { CommandExecutionService } from "../command-execution-service";

/**
 * Linux implementation for IShutdownService
 */
@injectable()
export class LinuxShutdownService {

    constructor(private logger: Logger,
        private commandExecutionService: CommandExecutionService) { }

    /** @inheritdoc */
    public shutdown(): void {
        this.logger.info("Shutting down server now.");
        this.commandExecutionService.execute("shutdown now");
    }
}
