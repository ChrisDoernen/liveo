import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { ServiceConfig } from "../../config/service.config";
import * as socketio from "socket.io";
import { Socket } from "socket.io";

@injectable()
export class WebsocketServer {

    private _websocketServer: any;

    /**
     * The currently available streams that are represented as rooms in socket.io
     */
    private _streams: string[] = [];

    constructor(@inject("Logger") private _logger: Logger) {
    }

    public initializeAndListen(server: any): void {
        const websocketServer = socketio(server);

        if (ServiceConfig.environment === "Development") {
            websocketServer.origins("*:*");
            this._logger.debug("Setting CORS header for websocket server.");
        }

        websocketServer.on("connection", this.onConnection.bind(this));
        this._websocketServer = websocketServer;
        this._logger.info("Websocket server started.");
    }

    private onConnection(socket: Socket): void {
        this.onConnect(socket);

        socket.on("subscribe", (streamId) => {
            this.subscribe(socket, streamId);
        });

        socket.on("disconnect", () => {
            this.onDisconnect(socket);
        });
    }

    private onConnect(socket: Socket): void {
        this._logger.info("Client connected.");
    }

    private onDisconnect(socket: Socket): void {
        this._logger.info("Client disconnected.");
    }

    private subscribe(socket: Socket, streamId: any): void {
        const id = this._streams.find((stream) => stream === streamId);

        if (!id) {
            this._logger.info(`Subscription for stream ${id} not possible, stream is not started.`);
            socket.emit("subscription_error", "The stream is not started.");
        } else {
            this._logger.info(`Client subscribed to stream ${id}.`);
            socket.join(id);
        }
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
