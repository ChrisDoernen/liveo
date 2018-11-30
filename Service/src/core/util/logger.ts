import * as winstonLogger from "../../config/logging.config";
import { injectable } from "inversify";

@injectable()
export class Logger {
    public debug(message: string): void {
        winstonLogger.debug(message);
    }

    public info(message: string): void {
        winstonLogger.info(message);
    }

    public error(message: string): void {
        winstonLogger.error(message);
    }
}
