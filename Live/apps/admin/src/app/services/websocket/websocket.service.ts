import { OnDestroy, Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ENDPOINTS, EVENTS } from "@live/constants";

@Injectable({
    providedIn: "root"
})
export class WebsocketService extends Socket implements OnDestroy {
    constructor() {
        super({ url: ENDPOINTS.root, options: { reconnectionAttempts: 6, path: ENDPOINTS.websocket } });
        this.on("connect", this.subscribeToAdmin.bind(this));
    }

    public subscribeToAdmin(): void {
        this.emit(EVENTS.subscribeAdmin);
        console.debug("Subscribe to admin");
    }

    public ngOnDestroy(): void {
        this.emit(EVENTS.unsubscribeAdmin);
        console.debug("Unsubscribe to admin");
    }
}