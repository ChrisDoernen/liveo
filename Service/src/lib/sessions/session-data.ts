/**
 * Class representing a streaming session entity
 */
export class SessionData {

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
}
