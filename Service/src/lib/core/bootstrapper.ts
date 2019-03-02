import { IDeviceDetector } from "../devices/i-device-detector";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { Logger } from "../logging/logger";
import { ServiceConfig } from "../../config/service.config";
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
    this._logger.debug(`Development: ${ServiceConfig.development}.`);
    this._logger.debug(`OS: ${ServiceConfig.os}.`);
    this._logger.debug(`Architecture: ${ServiceConfig.arch}.`);
    this._logger.debug(`Simulate streaming: ${ServiceConfig.simulate}.`);

    this._deviceDetector.detectDevices().then(() => {
      this._streamService.loadStreams();
      this._sessionService.loadSessions();
      const server = this._webServer.initializeAndListen();
      this._websocketServer.initializeAndListen(server);
    });
  }
}
