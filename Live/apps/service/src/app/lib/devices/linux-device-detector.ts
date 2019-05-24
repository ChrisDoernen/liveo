import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector extends DeviceDetector {
  private listDevicesCommand: string = "arecord -l";
  private audioDeviceRegexPattern: RegExp = new RegExp("(card \\d+: )");

  constructor(@inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
    super(logger, processExecutionService, deviceFactory);
  }

  public async detectDevices(): Promise<void> {
    return this.runDetection(this.listDevicesCommand);
  }

  protected parseResponse(response: string): Device[] {
    const lines = response.split("\n");

    return lines
      .filter((line) => this.audioDeviceRegexPattern.test(line))
      .map((line) => this.parseDevice(line));
  }

  private parseDevice(line: string): Device {
    const cardPrefix = line.match(this.audioDeviceRegexPattern)[0];
    const id = cardPrefix.match(new RegExp("\\d+")).toString();
    const description = line.slice(cardPrefix.length);

    return this.instantiateDevice(id, description, DeviceState.Available);
  }
}
