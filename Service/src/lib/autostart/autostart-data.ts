export class AutostartData {

    public autostart: boolean;

    /**
     * A session id to automatically activate the session
     */
    public autoactivate: string;

    constructor(autostart: boolean, autoactivate: string) {
        this.autostart = autostart;
        this.autoactivate = autoactivate;
    }
}
