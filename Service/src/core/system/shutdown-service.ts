import { injectable } from "inversify";
import { Logger } from "../util/logger";
import { CommandExecutionService } from "./command-execution-service";

@injectable()
export class ShutdownService {

    constructor(private logger: Logger,
        private commandExecutionService: CommandExecutionService) { }

    public shutdown(): void {
        this.logger.info("Shutting down server now.");
        this.commandExecutionService.executeAndForget("shutdown now");
    }
}
