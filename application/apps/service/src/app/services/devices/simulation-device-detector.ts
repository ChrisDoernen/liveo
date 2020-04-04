import { DeviceEntity, DeviceType } from "@liveo/entities";
import { inject, injectable } from "inversify";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection that always returnes valid devices
 */
@injectable()
export class SimulationDeviceDetector extends DeviceDetector {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("IdGenerator") idGenerator: IdGenerator,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceEntity, deviceState: DeviceState) => Device) {
    logger.warn("Instantiating simulation device detector.");
    super(logger, processExecutionService, idGenerator, deviceFactory);
    this.listDevicesCommand = "echo simulation";
  }

  protected parseResponse(response: string): Device[] {
    return [];
  }

  public getDevice(id: string): Device {
    this.logger.debug("Simulating device detection, returning available test device.");
    return this.instantiateDevice(id, "Test device", DeviceType.Unknown, DeviceState.Available);
  }
}
