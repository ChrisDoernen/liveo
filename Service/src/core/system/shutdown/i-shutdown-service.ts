/**
 * A contract for shutting down the system
 */
export interface IShutdownService {
    /**
     * Shuts down the system immediately
     */
    shutdown(): void;
}
