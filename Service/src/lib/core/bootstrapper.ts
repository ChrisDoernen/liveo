import { IDeviceDetector } from "../system/devices/i-device-detector";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { Logger } from "../util/logger";
import { config } from "../../config/service.config";
import { WebServer } from "./web-server";
import { WebsocketServer } from "./websocket-server";

export class Bootstrapper {

    constructor(private logger: Logger,
        private deviceDetector: IDeviceDetector,
        private streamService: StreamService,
        private sessionService: SessionService,
        private webServer: WebServer,
        private websocketServer: WebsocketServer) {
    }

    public startServer(): void {
        this.logger.info("Starting Live server...");
        this.logger.debug(`Environment: ${config.environment}.`);
        this.logger.debug(`OS: ${config.os}.`);
        this.logger.debug(`Architecture: ${config.arch}.`);

        this.deviceDetector.detectDevices().then(() => {
            this.streamService.loadStreams().then(() => {
                this.sessionService.loadSessions().then(() => {
                    const server = this.webServer.initialize();
                    this.websocketServer.initialize(server);
                    this.webServer.listen();
                    this.websocketServer.listen();
                });
            });
        });
    }
}
