import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { Job, scheduleJob } from "node-schedule";

/**
 * Proxy class for node-schedule scheduler
 */
@injectable()
export class Scheduler {

    private _jobs: Job[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public schedule(id: string, date: Date, callback: () => void): void {
        this.checkId(id);

        const job = scheduleJob(id, date, (fireDate) => {
            this._logger.debug(`Running job. Scheduled time was: ${fireDate}.`);
            callback();
        });

        if (job) {
            this._jobs.push(job);
            this._logger.debug(`Scheduled job with id ${id} to be executed on ${date}.`);
        } else {
            this._logger.warn("Can not schedule job: Date is in the past.");
        }
    }

    private checkId(id: string): any {
        if (this._jobs.find((job) => job.name === id)) {
            throw new Error(`A job with id ${id} is already existing.`);
        }
    }

    public cancelJob(id: string): void {
        const matchingJob = this._jobs.find((job) => job.name === id);

        if (!matchingJob) {
            throw new Error(`Job with id ${id} was not found.`);
        }

        const matchingJobIndex = this._jobs.indexOf(matchingJob);
        this._jobs.splice(matchingJobIndex, 1);

        matchingJob.cancel();
        this._logger.debug(`Canceled job with id ${id}.`);
    }
}
