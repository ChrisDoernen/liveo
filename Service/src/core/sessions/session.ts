/**
 * Class representing a streaming session
 */
export class Session {

    constructor(public id: string,
        public title: string,
        public streams: string[]) { }

    public static fromRequest(request: any): Session {
        return new Session(request.id, request.title, request.streams);
    }
}
