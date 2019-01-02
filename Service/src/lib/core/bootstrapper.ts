import { IDeviceDetector } from "../devices/i-device-detector";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { Logger } from "../util/logger";
import { config } from "../../config/service.config";
import { WebServer } from "./web-server";
import { WebsocketServer } from "./websocket-server";
import { injectable, inject } from "inversify";

@injectable()
export class Bootstrapper {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("IDeviceDetector") private _deviceDetector: IDeviceDetector,
        @inject("StreamService") private _streamService: StreamService,
        @inject("SessionService") private _sessionService: SessionService,
        @inject("WebServer") private _webServer: WebServer,
        @inject("WebsocketServer") private _websocketServer: WebsocketServer) {
    }

    public startServer(): void {
        this._logger.info("Starting Live server...");
        this._logger.debug(`Environment: ${config.environment}.`);
        this._logger.debug(`OS: ${config.os}.`);
        this._logger.debug(`Architecture: ${config.arch}.`);

        this._deviceDetector.detectDevices()
            .then(() => {
                this._streamService.loadStreams()
                    .then(() => {
                        this._sessionService.loadSessions()
                            .then(() => {
                                this.startWebAndWebsocketServer();
                            }).catch((error) => {
                                this._logger.error(`Could not load session: ${error}.`);
                            });
                    }).catch((error) => {
                        this._logger.error(`Could not load streams: ${error}.`);
                    });
            }).catch((error) => {
                this._logger.error(`Could not detect devices: ${error}.`);
            });
    }

    private startWebAndWebsocketServer(): void {
        const server = this._webServer.initialize();
        this._websocketServer.initialize(server);
        this._webServer.listen();
        this._websocketServer.listen();
    }
}
