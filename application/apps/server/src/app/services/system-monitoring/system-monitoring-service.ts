import { EVENTS } from "@liveo/constants";
import { Injectable } from "@nestjs/common";
import * as os from "os-utils";
import { AdminGateway } from "../../gateways/admin.gateway";
import { Logger } from "../logging/logger";

@Injectable()
export class SystemMonitoringService {

  constructor(
    private readonly _logger: Logger,
    private readonly _adminGateway: AdminGateway
  ) {
  }

  public startMonitoring(): void {
    setInterval(() => {
      os.cpuUsage(this.logCPUUsage.bind(this));
    }, 1000);
  }

  private logCPUUsage(cpuUsage: number): void {
    if (cpuUsage > 50) {
      this._logger.warn("High CPU usage.");
    }
    const cpuUsageRounded = cpuUsage.toFixed(2)
    this._adminGateway.emit(EVENTS.cpuUsage, cpuUsageRounded);
  }
}
