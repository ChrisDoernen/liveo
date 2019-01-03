import { StreamEntity } from "../streams/stream.entity";

/**
 * Session data transfer object for communication with the client
 */
export class SessionEntity {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public timeStarted: number,
        public timeEnded: number,
        public timeStarting: number,
        public timeEnding: number,
        public streams: StreamEntity[]) {
    }
}
