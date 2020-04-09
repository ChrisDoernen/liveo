import { DeviceEntity, DeviceType } from "@liveo/entities";
import { inject, injectable } from "inversify";
import { EOL } from "os";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { PlatformConstants } from "../../../../../server/src/app/services/platform-constants/platform-constants";
import { ProcessExecutionService } from "../../../../../server/src/app/services/process-execution/process-execution-service";
import { IdGenerator } from "../id-generation/id-generator";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector extends DeviceDetector {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("PlattformConstants") private _plattformConstants: PlatformConstants,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("IdGenerator") idGenerator: IdGenerator,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceEntity, deviceState: DeviceState) => Device) {
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

    return this.instantiateDevice(id, description, DeviceType.Audio, DeviceState.Available);
  }
}
