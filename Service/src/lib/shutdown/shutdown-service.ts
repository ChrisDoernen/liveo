import { inject } from "inversify";
import { Logger } from "./../util/logger";
import { Scheduler } from "../scheduling/scheduler";
import { Shutdown } from "./shutdown";

/**
 * Base class for machine shutdown
 */
export abstract class ShutdownService {

    private _shutdown: Shutdown;

    private _shutdownJobId: string = "SHUTDOWN_JOB";

    constructor(@inject("Logger") protected logger: Logger,
        @inject("Scheduler") private _scheduler: Scheduler) {
    }

    public setShutdown(shutdown: Shutdown): void {
        this.logger.debug(`Receiving new shutdown: ${JSON.stringify(shutdown)}.`);

        if (shutdown.shutdownTime) {
            this._scheduler.schedule(this._shutdownJobId, shutdown.shutdownTime, this.executeShutdown);
        } else {
            this.executeShutdown();
        }
    }

    public getShutdown(): Shutdown {
        return this._shutdown;
    }

    protected abstract executeShutdown(): void;

    public deleteShutdown(): void {
        throw new Error("Method not implemented.");
    }
}
