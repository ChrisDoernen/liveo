import * as Ffmpeg from "fluent-ffmpeg";
import { Container, inject, injectable } from "inversify";
import { EOL } from "os";
import { environment } from "../../environments/environment";
import { config } from "../config/service.config";
import { AutoActivationService } from "../services/activation/auto-activation-service";
import { DataService } from "../services/data/data-service";
import { DeviceService } from "../services/devices/device.service";
import { Logger } from "../services/logging/logger";
import { ProcessExecutionService } from "../services/process-execution/process-execution-service";
import { SystemMonitoringService } from "../services/system-monitoring/system-monitoring-service";
import { WebServer } from "./web-server";
import { WebsocketServer } from "./websocket-server";

@injectable()
export class Bootstrapper {
  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("DeviceService") private _deviceService: DeviceService,
    @inject("AutoActivationService") private _autoActivationService: AutoActivationService,
    @inject("WebServer") private _webServer: WebServer,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    @inject("DataService") private _dataService: DataService,
    @inject("SystemMonitoringService") private _systemMonitoringServcie: SystemMonitoringService,
    @inject("ProcessExecutionService") private readonly _processExecutionService: ProcessExecutionService) {
  }

  public async startServer(container: Container): Promise<void> {
    this._logger.info("STARTING LIVE SERVER");
    this._logger.info(`Version: v${environment.version}/${environment.revision}`);
    this._logger.debug(`Production: ${config.production}`);
    this._logger.debug(`Executable: ${config.executable}`);
    this._logger.debug(`Operating system: ${config.os}`);
    this._logger.debug(`Architecture: ${config.arch}`);
    this._logger.debug(`Simulate streaming: ${config.simulate}`);
    this._logger.debug(`Filesource: ${config.filesource}`);
    this._logger.debug(`Standalone: ${config.standalone}`);
    this._logger.debug(`Database: ${config.database}`);
    this._logger.debug(`Ffmpeg: ${config.ffmpegPath}`);
    this._logger.debug(`Working directory: ${config.workingDirectory}`);

    const ffmpegVersionOutput = await this._processExecutionService.executeAsync(`"${config.ffmpegPath}" -version`);
    const ffmpegVersion = ffmpegVersionOutput.split(EOL)[0];
    this._logger.debug(`Ffmpeg version: ${ffmpegVersion}`);

    Ffmpeg.setFfmpegPath(config.ffmpegPath);

    this._dataService.initializeDatabase();
    await this._deviceService.initialize();

    const server = this._webServer.initializeAndListen(container);
    this._websocketServer.initializeAndListen(server);
    this._systemMonitoringServcie.startMonitoring();
    this._autoActivationService.performAutoActivation();
  }

  public stopServer(): void {
    this._logger.info("STOPPING LIVE SERVER");
    this._webServer.shutdown();
  }
}
