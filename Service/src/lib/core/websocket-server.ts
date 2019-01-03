import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { config } from "../../config/service.config";
import * as socketio from "socket.io";
import { Socket } from "socket.io";

@injectable()
export class WebsocketServer {

    private _websocketServer: socketio.Server;

    /**
     * The currently available streams that are represented as rooms in socket.io
     */
    private _streams: string[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public initializeAndListen(server: any): void {
        this._websocketServer = socketio(server, { path: "/streams", transports: ["websocket", "xhr-polling"] });

        if (config.environment === "Development") {
            this._websocketServer.origins("*:*");
        }

        this._websocketServer.on("connection", this.onConnection);
        this._logger.info("Websocket server started.");
    }

    private onConnection(socket: Socket): void {
        this._logger.info("Client connected.");

        // socket.join(this._streams[0]);

        socket.on("disconnect", () => {
            this._logger.info("Client disconnected.");
        });
    }

    public addStream(id: string): void {
        this._streams.push(id);
    }

    public removeStream(id: string): void {
        const index = this._streams.indexOf(id);
        if (index > -1) {
            this._streams.slice(index, 1);
        }
    }

    public emit(id: string, data: Buffer): void {
        this._websocketServer.to(id).emit(id, data);
        this._logger.debug(`emit ${data.length}`);
    }
}
