export class ActivationRequest {

    /**
     * The request to activate a session
     *
     * @param sessionId The id of the session to activate
     * @param timeStarting The time the session start shall be scheduled
     * @param timeEnding The time the session end shall be scheduled
     * @param timeServerShutdown The time an automatic server shutdown shall be executed
     */
    constructor(public sessionId: string,
        public timeStarting: Date,
        public timeEnding: Date,
        public timeServerShutdown: Date) {
    }
}
