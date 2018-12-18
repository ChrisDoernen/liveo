/**
 * Class representing a streaming session
 */
export class Session {

    /**
     * A unique identifier
     */
    public id: string;

    /**
     * A title to be displayed to the user
     */
    public title: string;

    /**
     * A list of streams contained by the session
     */
    public streams: string[];

    constructor(id: string, title: string, streams: string[]) {
        this.id = id;
        this.title = title;
        this.streams = streams;
    }

    public static fromRequest(request: any): Session {
        return new Session(request.id, request.title, request.streams);
    }
}
