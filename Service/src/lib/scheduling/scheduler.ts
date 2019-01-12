import { inject } from "inversify";
import { Logger } from "../util/logger";
import { Job, scheduleJob } from "node-schedule";

export class Scheduler {

    private jobs: Job[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public schedule(id: string, date: Date, callback: () => void): void {
        this.checkId(id);

        const job = scheduleJob(date, (fireDate) => {
            this._logger.debug(`Running job. Scheduled time was: ${fireDate}.`);
            callback();
        });

        this.jobs.push(job);
        this._logger.debug(`Scheduled job with id ${id} to be executed on ${date}.`);
    }

    private checkId(id: string): any {
        if (this.jobs.find((job) => job.name === id)) {
            throw new Error(`A job with id ${id} is already existing.`);
        }
    }

    public cancelJob(id: string): void {
        const matchingJob = this.jobs.find((job) => job.name === id);

        if (!matchingJob) {
            throw new Error(`Job with id ${id} was not found.`);
        }

        matchingJob.cancel();
    }
}
