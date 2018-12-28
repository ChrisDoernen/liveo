import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Socket } from "socket.io";

@injectable()
export class WebsocketService {

    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public onConnection(socket: Socket): void {
        this.logger.info("client connected.");
    }

}
