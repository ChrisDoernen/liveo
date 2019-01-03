import { StreamEntity } from "../streams/stream.entity";

/**
 * Session data transfer object for communication with the client
 */
export class SessionEntity {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public timeStarted: Date,
        public timeEnded: Date,
        public timeStarting: Date,
        public timeEnding: Date,
        public streams: StreamEntity[]) {
    }
}
