import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";
import { EOL } from "os";
import { DeviceType } from "./device-type";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector extends DeviceDetector {
  private listDevicesCommand = "arecord -L";

  constructor(
    @inject("Logger") logger: Logger,
    @inject("ProcessExecutionService") processExecutionService: ProcessExecutionService,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
    super(logger, processExecutionService, deviceFactory);
  }

  public async detectDevices(): Promise<void> {
    return this.runDetection(this.listDevicesCommand);
  }

  protected async executeListDevicesCommand(command: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this._processExecutionService.execute(command, (error, stdout, stderr) => {
        resolve(stdout);
      });
    });
  }

  protected parseResponse(response: string): Device[] {
    const lines = response.split(EOL);

    return lines
      .filter((line) => line.startsWith("hw:"))
      .map((line) => this.parseDevice(line));
  }

  private parseDevice(line: string): Device {
    const id = line.replace("hw:", "");
    const description = line;

    return this.instantiateDevice(id, description, DeviceType.Audio, DeviceState.Available);
  }
}
