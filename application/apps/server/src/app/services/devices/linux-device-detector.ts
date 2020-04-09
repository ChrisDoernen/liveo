import { DeviceEntity, DeviceType } from "@liveo/entities";
import { EOL } from "os";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/platform-constants";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";

/**
 * Implementation of device detection on linux machines
 */
export class LinuxDeviceDetector extends DeviceDetector {

  constructor(
    logger: Logger,
    private _plattformConstants: PlatformConstants,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator,
    deviceFactory: (deviceData: DeviceEntity) => Device) {
    super(logger, processExecutionService, idGenerator, deviceFactory);
    this.listDevicesCommand = "arecord -L";
  }

  protected parseResponse(response: string): Device[] {
    const lines = response.split(EOL);

    return lines
      .filter((line) => line.startsWith(this._plattformConstants.devicePrefix))
      .map((line) => this.parseDevice(line));
  }

  private parseDevice(line: string): Device {
    const id = line.replace(this._plattformConstants.devicePrefix, "");
    const description = line;

    return this.instantiateDevice(id, description, DeviceType.Audio);
  }
}
