import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { injectable } from "inversify";
import { DeviceType } from "./device-type";

/**
 * A abstract class for device detection
 */
@injectable()
export abstract class DeviceDetector {
  public devices: Device[];

  public getDevices(): Device[] {
    return this.devices;
  }

  protected listDevicesCommand: string;

  constructor(
    protected logger: Logger,
    protected processExecutionService: ProcessExecutionService,
    private _deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
  }

  public async runDetection(): Promise<void> {
    await this.executeListDevicesCommand()
      .then((response) => {
        this.logger.debug("Detecting audio inputs.");

        this.devices = this.parseResponse(response);

        if (this.devices.length === 0) {
          this.logger.warn("No devices detected. Please check your sound cards.");
        }
      });
  }

  private async executeListDevicesCommand(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      this.processExecutionService.execute(this.listDevicesCommand, (error, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
        } else {
          resolve(stderr);
        }
      });
    });
  }

  protected abstract parseResponse(output: string): Device[];

  public getDevice(id: string): Device {
    const matchingDevice = this.devices.find((device) => device.id === id);

    return matchingDevice || this.instantiateDevice(id, null, DeviceType.Unknown, DeviceState.UnknownDevice);
  }

  protected instantiateDevice(id: string, description: string, deviceType: DeviceType, deviceState: DeviceState): Device {
    return this._deviceFactory(new DeviceData(id, description, deviceType), deviceState);
  }
}
