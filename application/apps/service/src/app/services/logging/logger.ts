import { injectable } from "inversify";

/**
 * Wrapper class for logging
 */
@injectable()
export class Logger {

    constructor(private _logger: any) {
    }

    public debug(message: string): void {
        this._logger.debug(message);
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public warn(message: string): void {
        this._logger.warn(message);
    }

    public error(message: string): void {
        this._logger.error(message);
    }
}
