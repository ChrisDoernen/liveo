import { injectable } from "inversify";
import { Logger } from "../util/logger";
import { CommandExecutor } from "./command-executor";

@injectable()
export class ShutdownService {

    constructor(private logger: Logger,
        private commandExecutor: CommandExecutor) { }

    public shutdown(): void {
        this.logger.info("Shutting down server now.");
        this.commandExecutor.executeAndForget("shutdown now");
    }
}
