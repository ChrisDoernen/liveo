import { DeviceEntity, DeviceType } from "@live/entities";
import { inject, injectable } from "inversify";
import { EOL } from "os";
import { AudioSystem } from "../audio-system/audio-system";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
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
    @inject("AudioSystem") private _audioSystem: AudioSystem,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceEntity, deviceState: DeviceState) => Device) {
    super(logger, processExecutionService, deviceFactory);
    this.listDevicesCommand = "arecord -L";
  }

  protected parseResponse(response: string): Device[] {
    const lines = response.split(EOL);

    return lines
      .filter((line) => line.startsWith(this._audioSystem.devicePrefix))
      .map((line) => this.parseDevice(line));
  }

  private parseDevice(line: string): Device {
    const id = line.replace(this._audioSystem.devicePrefix, "");
    const description = line;

    return this.instantiateDevice(id, description, DeviceType.Audio, DeviceState.Available);
  }
}
