import { inject } from "inversify";
import { Logger } from "../util/logger";
import { Job, scheduleJob } from "node-schedule";

export class Scheduler {

    private jobs: Job[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public schedule(date: Date, callback: () => void): void {
        const job = scheduleJob(date, (fireDate) => {
            this._logger.debug(`Running job. Scheduled time was: ${fireDate}.`);
            callback();
        });

        this._logger.debug(`Scheduled job.`);
    }
}
