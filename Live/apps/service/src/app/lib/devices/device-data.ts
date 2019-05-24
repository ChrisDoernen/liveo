/**
 * Class representing a device data transfer object
 */
export class DeviceData {
    public id: string;
    public description: string;

    constructor(id: string,
        description: string) {
        this.id = id;
        this.description = description;
    }
}
