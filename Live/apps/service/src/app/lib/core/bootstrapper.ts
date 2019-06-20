import { DeviceDetector } from "../devices/device-detector";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "../sessions/session-service";
import { Logger } from "../logging/logger";
import { ServiceConfig } from "../../config/service.config";
import { WebServer } from "./web-server";
import { WebsocketServer } from "./websocket-server";
import { injectable, inject } from "inversify";
import { SystemMonitoringService } from "../system-monitoring/system-monitoring-service";

@injectable()
export class Bootstrapper {
  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("DeviceDetector") private _deviceDetector: DeviceDetector,
    @inject("StreamService") private _streamService: StreamService,
    @inject("SessionService") private _sessionService: SessionService,
    @inject("WebServer") private _webServer: WebServer,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    @inject("SystemMonitoringService") private _systemMonitoringServcie: SystemMonitoringService) {
  }

  public startServer(container): void {
    this._logger.info("Starting Live server...");
    this._logger.debug(`Production: ${ServiceConfig.production}.`);
    this._logger.debug(`Operating system: ${ServiceConfig.os}.`);
    this._logger.debug(`Architecture: ${ServiceConfig.arch}.`);
    this._logger.debug(`Simulate streaming: ${ServiceConfig.simulate}.`);
    this._logger.debug(`Filesource: ${ServiceConfig.filesource}.`);
    this._logger.debug(`Standalone: ${ServiceConfig.standalone}.`);

    this._deviceDetector.detectDevices().then(() => {
      this._streamService.loadStreams();
      this._sessionService.loadSessions();
      const server = this._webServer.initializeAndListen(container);
      this._websocketServer.initializeAndListen(server);
      this._systemMonitoringServcie.startCPUMonitoring();
    });
  }
}
