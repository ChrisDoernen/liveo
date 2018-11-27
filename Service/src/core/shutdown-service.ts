import * as logger from "../config/logging.config";
import { injectable } from "inversify";

@injectable()
export class ShutdownService {

    public shutdown(): void {
        logger.info("Shutdown Service");
        // exec('shutdown now');
    }
}
