import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from './device-data';
import { DeviceState } from './device-state';

@injectable()
export class WindowsDeviceDetector extends DeviceDetector {
  private listDevicesCommand: string = "ffmpeg -list_devices true -f dshow -i dummy -hide_banner";
  private audioDeviceRegexPattern: string = `(?<="")(.*?)(?="")`;

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
    return null;
  }

  private lineContainsAudioDevice(line: string): boolean {
    return line.includes("(") && line.includes(")") && line.includes("\"");
  }

  public getDevice(id: string): Device {
    throw new Error("Method not implemented.");
  }
}
