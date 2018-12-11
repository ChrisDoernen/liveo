/**
 * Class representing a streaming session
 */
export class Session {

    constructor(public id: string,
        public title: string,
        public deviceId: string) { }

    public static fromRequest(request: any): Session {
        return new Session(request.id, request.title, request.deviceId);
    }

    public equals(other: Session): boolean {
        return this.id === other.id &&
            this.title === other.title &&
            this.deviceId === other.deviceId;
    }
}
