import { IDeviceDetector } from "../devices/i-device-detector";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { Logger } from "../util/logger";
import { config } from "../../config/service.config";
import { WebServer } from "./web-server";
import { WebsocketServer } from "./websocket-server";
import { injectable, inject } from "inversify";
import { AutostartService } from "../autostart/autostart-service";

@injectable()
export class Bootstrapper {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("IDeviceDetector") private _deviceDetector: IDeviceDetector,
        @inject("StreamService") private _streamService: StreamService,
        @inject("SessionService") private _sessionService: SessionService,
        @inject("AutostartService") private _autostartService: AutostartService,
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
                                this._webServer.initializeAndListen()
                                    .then((server) => {
                                        this._websocketServer.initializeAndListen(server)
                                            .then(() => {
                                                this._autostartService.autoStart();
                                            });
                                    });
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
}
