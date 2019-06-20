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

  private logCPUUsage(cpuUsage: string): void {
    this._websocketServer.emitAdminEventMessage(EVENTS.cpuUsage, cpuUsage);
  }
}
