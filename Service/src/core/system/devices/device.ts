/**
 * Represents either an audio or video device available in the system
 */
export class Device {

    /**
     * A unique identifier
     */
    public id: string;

    /**
     * A technical description
     */
    public description: string;

    constructor(id: string, description: string) {
        this.id = id;
        this.description = description;
    }
}
