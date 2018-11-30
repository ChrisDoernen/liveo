import { injectable, inject } from "inversify";
import { Logger } from "../util/logger";

@injectable()
export class ShutdownServiceSimulator {

    constructor(private logger: Logger) { }

    public shutdown(): void {
        this.logger.info("Simulating shutdown.");
    }
}
