import { Device } from "../system/devices/device";

/**
 * Class representing a live stream
 */
export class Stream {

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

    public static fromRequest(request: any): Stream {
        return new Stream(request.id, request.title, request.countryCode, request.deviceId);
    }
}
