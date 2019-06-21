import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { WebsocketServer } from "../core/websocket-server";
import * as os from "os-utils";
import { EVENTS } from "@live/constants";

@injectable()
export class SystemMonitoringService {
  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer) {
  }

  public startCPUMonitoring(): void {
    setInterval(() => {
      os.cpuUsage(this.logCPUUsage.bind(this));
    }, 2000);
  }

  private logCPUUsage(cpuUsage: number): void {
    if(cpuUsage > 50 ) {
      this._logger.warn("High CPU usage.");
    }
    const cpuUsageRounded = cpuUsage.toFixed(2)
    this._websocketServer.emitAdminEventMessage(EVENTS.cpuUsage, cpuUsageRounded);
  }
}
