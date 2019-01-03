/**
 * Session data transfer object
 */
export class Session {

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
