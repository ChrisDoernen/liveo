import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { Job, scheduleJob } from "node-schedule";

/**
 * Proxy class for node-schedule scheduler
 */
@injectable()
export class Scheduler {

  private _jobs: Map<string, Job> = new Map<string, Job>();

  constructor(@inject("Logger") private _logger: Logger) {
  }

  public schedule(id: string, time: number, callback: () => void): void {
    this.checkIfJobWithIdAlreadyExists(id);
    const timestampInMs = time * 1000;
    const dateTime = new Date(timestampInMs);

    const job = scheduleJob(id, dateTime, (fireDate) => {
      this._logger.debug(`Running scheduled job. Scheduled time was: ${fireDate}.`);
      callback();
      this.removeJob(id);
    });

    if (job) {
      this._jobs.set(id, job);
      this._logger.debug(`Scheduled job with id ${id} to be executed on ${dateTime}.`);
    } else {
      this._logger.warn("Can not schedule job: Date is in the past.");
    }
  }

  private checkIfJobWithIdAlreadyExists(id: string): any {
    if (this._jobs.get(id)) {
      throw new Error(`A job with id ${id} is already existing.`);
    }
  }

  public cancelJob(id: string): void {
    const job = this._jobs.get(id);

    if (!job) {
      throw new Error(`Job with id ${id} was not found.`);
    }

    job.cancel();
    this.removeJob(id);

    this._logger.debug(`Canceled job with id ${id}.`);
  }

  private removeJob(id: string): void {
    this._jobs.delete(id);
    this._logger.debug(`Removed job with id ${id}.`);
  }
}
