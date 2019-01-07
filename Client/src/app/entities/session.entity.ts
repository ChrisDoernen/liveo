/**
 * Session data transfer object
 */
export class Session {

    /**
     * Represents a streaming session
     * @param id The id of the stream
     * @param title The title of the stream
     * @param description The description of the stram
     * @param timeStarted The time the stream was started the last time
     * @param timeEnded The time the stream ended the last time
     * @param timeStarting The time the session will be started automatically
     * @param timeEnding The time the session will be ended automatically
     * @param streams The strems of the session
     */
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public timeStarted: number,
        public timeEnded: number,
        public timeStarting: number,
        public timeEnding: number,
        public streams: string[]) {
        console.debug(`Instantiating session ${JSON.stringify(this)}.`);
    }
}
