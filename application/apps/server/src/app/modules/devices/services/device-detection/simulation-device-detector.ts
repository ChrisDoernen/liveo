import { DeviceType } from "@liveo/entities";
import { Logger } from "../../../core/services/logging/logger";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { ProcessExecutionService } from "../../../shared/services/process-execution/process-execution-service";
import { Device } from "../../device/device";
import { DeviceFactory } from "../../device/device-factory";
import { DeviceDetector } from "./device-detector";

/**
 * Implementation of device detection that always returnes valid devices
 */
export class SimulationDeviceDetector extends DeviceDetector {

  constructor(
    logger: Logger,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator,
    deviceFactory: DeviceFactory
  ) {
    logger.warn("Instantiating simulation device detector.");
    super(logger, processExecutionService, idGenerator, deviceFactory);
    this.listDevicesCommand = "echo simulation";
  }

  protected parseResponse(response: string): Device[] {
    return [];
  }

  public getDevice(id: string): Device {
    this.logger.debug("Simulating device detection, returning available test device.");
    return this.instantiateDevice(id, "Test device", DeviceType.Unknown);
  }
}
