import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Socket } from "socket.io";

@injectable()
export class WebsocketService {

    private websocketServer: any;

    /**
     * The currently available streams that are represented as rooms in socket.io
     */
    private streams: string[];

    constructor(private logger: Logger) { }

    public init(websocketServer: any): void {
        this.websocketServer = websocketServer;
        this.websocketServer.on("connection", this.onConnection);
    }

    public onConnection(socket: Socket): void {
        this.logger.info("client connected.");
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

    }
}
