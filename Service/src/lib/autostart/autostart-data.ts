export class AutostartData {

    public autostart: boolean;

    public sessionId: string;

    constructor(autostart: boolean, sessionId: string) {
        this.autostart = autostart;
        this.sessionId = sessionId;
    }
}
