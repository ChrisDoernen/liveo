/**
 * Session data transfer object for communication with the client
 */
export class SessionEntity {

    /**
     * Constructs the session entity
     *
     * @param id Id of the session
     * @param title Title of the session
     * @param description Description o
     * @param timeStarted The time the session started
     * @param timeEnded The time the session ended
     * @param streams The strams that are contained by the session
     */
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public timeStarted: number,
        public timeEnded: number,
        public streams: string[]) {
    }
}
