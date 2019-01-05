import * as winstonLogger from "../../config/logging";
import { injectable } from "inversify";

/**
 * Wrapper class for logging
 */
@injectable()
export class Logger {
    public debug(message: string): void {
        winstonLogger.debug(message);
    }

    public info(message: string): void {
        winstonLogger.info(message);
    }

    public warn(message: string): void {
        winstonLogger.warn(message);
    }

    public error(message: string): void {
        winstonLogger.error(message);
    }
}
