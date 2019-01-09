/**
 * A contract for shutting down the system
 */
export interface IShutdownService {

    /**
     * Shuts down the system immediately
     */
    shutdown(): void;

    /**
     * Schedules the server shutdown
     *
     * @param time The date time the server shall shut down automatically
     */
    scheduleShutdown(time: Date): void;

    /**
     * Unschedules any scheduled shutdown
     */
    unscheduleShutdown(): void;
}
