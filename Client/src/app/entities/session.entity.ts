import { Stream } from "./stream.entity";

export class Session {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public timeStarted: Date,
        public timeEnded: Date,
        public timeStarting: Date,
        public timeEnding: Date,
        public streams: Stream[]) {
        console.debug(`Instantiating session with id ${id}`);
    }

    public static deserialize(input: any): Session {
        const id = input.id;
        const title = input.title;
        const description = input.description;
        const timeStarted = input.timeStarted;
        const timeEnded = input.timeEnded;
        const timeStarting = input.timeStarted;
        const timeEnding = input.timeEnding;
        const streams = [];
        input.streams.forEach((stream: any) => {
            streams.push(Stream.deserialize(stream));
        });

        return new Session(id, title, description, timeStarted,
            timeEnded, timeStarting, timeEnding, streams);
    }
}