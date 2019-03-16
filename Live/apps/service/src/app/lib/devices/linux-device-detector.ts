import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector implements IDeviceDetector {

  private _devices: Device[] = [];

  public get devices(): Device[] {
    return this._devices;
  }

  private listDevicesCommand: string = "arecord -l";

  private audioDeviceRegexPattern: RegExp = new RegExp("(card \\d+: )");

  constructor(@inject("Logger") private _logger: Logger,
    @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
    @inject("DeviceFactory") private _deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
  }

  public async detectDevices(): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      this.executeListDevicesCommand().then((response) => {
        this._logger.debug("Detecting audio inputs.");

        this._devices = this.parseResponse(response);

        if (this._devices.length === 0) {
          this._logger.warn("No devices detected. Please check your sound cards.");
        }

        resolve();
      });
    });
  }

  private async executeListDevicesCommand(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this._processExecutionService.execute(this.listDevicesCommand, (error, stdout, stderr) => {
        resolve(stdout);
      });
    });
  }

  private parseResponse(response: string): Device[] {
    const lines = response.split("\n");

    return lines
      .filter((line) => this.audioDeviceRegexPattern.test(line))
      .map((line) => this.parseDevice(line));
  }

  private parseDevice(line: string): Device {
    const cardPrefix = line.match(this.audioDeviceRegexPattern)[0];
    const id = cardPrefix.match(new RegExp("\\d+")).toString();
    const description = line.slice(cardPrefix.length);

    return this._deviceFactory(new DeviceData(id, description), DeviceState.Available);
  }

  public getDevice(id: string): Device {
    const matchingDevice = this._devices.find((device) => device.id === id);

    return matchingDevice ? matchingDevice : this.getUnknownDevice(id);
  }

  private getUnknownDevice(id: string): Device {
    return this._deviceFactory(new DeviceData(id, ""), DeviceState.UnknownDevice);
  }
}
