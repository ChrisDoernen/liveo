import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import * as socketio from "socket.io";
import { Socket } from "socket.io";
import { InversifyExpressServer } from "inversify-express-utils";

@injectable()
export class WebsocketServer {

    private _websocketServer: any;

    /**
     * The currently available streams that are represented as rooms in socket.io
     */
    private streams: string[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public initializeAndListen(server: InversifyExpressServer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._websocketServer = socketio(server, { path: "/streams" });
            this._websocketServer.on("connection", this.onConnection);
            resolve();
        });
    }

    public onConnection(socket: Socket): void {
        this._logger.info("client connected.");
    }

    public addStream(id: string): void {
        this.streams.push(id);
    }

    public removeStream(id: string): void {
        const index = this.streams.indexOf(id);
        if (index > -1) {
            this.streams.slice(index, 1);
        }
    }

    public emit(id: string, data: Buffer): void {
        this._websocketServer.emit(id, data);
    }
}
