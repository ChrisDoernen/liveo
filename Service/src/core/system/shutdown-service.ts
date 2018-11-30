import { injectable } from "inversify";
import { Logger } from "../util/logger";
import { exec } from "child_process";

@injectable()
export class ShutdownService {

    constructor(private logger: Logger) { }

    public shutdown(): void {
        this.logger.info("Shutting down server now.");
        exec("shutdown now");
    }
}
