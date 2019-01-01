/**
 * Class representing a live stream data transfer object
 */
export class StreamData {

    public id: string;

    public title: string;

    public countryCode: string;

    public deviceId: string;

    constructor(id: string, title: string, countryCode: string, deviceId: string) {
        this.id = id;
        this.title = title;
        this.countryCode = countryCode;
        this.deviceId = deviceId;
    }
}
