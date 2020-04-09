
import { Container, inject, injectable } from "inversify";
import { Logger } from "../../../../server/src/app/services/logging/logger";
import { ProcessExecutionService } from "../../../../server/src/app/services/process-execution/process-execution-service";
import { SystemMonitoringService } from "../../../../server/src/app/services/system-monitoring/system-monitoring-service";
import { AutoActivationService } from "../services/activation/auto-activation-service";
import { DataService } from "../services/data/data-service";
import { DeviceService } from "../services/devices/device.service";
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
