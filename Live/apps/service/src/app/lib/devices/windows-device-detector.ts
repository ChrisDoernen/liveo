import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from './device-data';
import { DeviceState } from './device-state';
import { EOL } from 'os';

@injectable()
export class WindowsDeviceDetector extends DeviceDetector {
  private listDevicesCommand: string = "ffmpeg -list_devices true -f dshow -i dummy -hide_banner";

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
        // FFMPEG writes to stderr
        resolve(stderr);
      });
    });
  }

  protected parseResponse(response: string): Device[] {
    const lines = response.split(EOL);

    return lines
      .filter((line) => this.lineContainsAudioDevice(line))
      .map((line) => this.parseDevice(line));
  }

  private lineContainsAudioDevice(line: string): boolean {
    return line.includes("(") && line.includes(")") && line.includes("\"");
  }

  private parseDevice(line: string): Device {
    const cardTrimStart = line.substr(29, line.length);
    const cardTrimEnd = cardTrimStart.substr(0, cardTrimStart.length - 1);
    const id = cardTrimEnd;
    const description = cardTrimEnd;

    return this.instantiateDevice(id, description, DeviceState.Available);
  }
}
