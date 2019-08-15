import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceType } from "./device-type";

/**
 * Implementation of device detection that always returnes valid devices
 */
@injectable()
export class SimulationDeviceDetector extends DeviceDetector {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
    logger.warn("Instantiating simulation device detector.");
    super(logger, processExecutionService, deviceFactory);
    this.listDevicesCommand = "echo simulation";
  }

  protected parseResponse(response: string): Device[] {
    return [];
  }

  public getDevice(id: string): Device {
    this.logger.info("Simulating device detection, returning available test device.");
    return this.instantiateDevice(id, "Test device", DeviceType.Unknown, DeviceState.Available);
  }
}
