/**
 * Class representing a live stream entity
 */
export class StreamData {

    /**
     * A unique identifier
     */
    public id: string;

    /**
     * A title to be displayed to the user
     */
    public title: string;

    /**
     * A two digit country code representing the language
     */
    public countryCode: string;

    /**
     * The device used as source for the stream
     */
    public deviceId: string;

    constructor(id: string, title: string, countryCode: string, deviceId: string) {
        this.id = id;
        this.title = title;
        this.countryCode = countryCode;
        this.deviceId = deviceId;
    }
}
