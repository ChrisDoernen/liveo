import { injectable } from "inversify";
import { Logger } from "../../util/logger";

/**
 * Implementation for shutdown simulation
 */
@injectable()
export class ShutdownSimulationService {

    constructor(private logger: Logger) { }

    /** @inheritdoc */
    public shutdown(): void {
        this.logger.info("Simulating shutdown.");
    }
}
