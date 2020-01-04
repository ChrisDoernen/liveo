import { DeviceEntity, DeviceType } from "@live/entities";
import { injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Device } from "./device";
import { DeviceState } from "./device-state";

/**
 * A abstract class for device detection
 */
@injectable()
export abstract class DeviceDetector {

  protected listDevicesCommand: string;

  public devices: Device[];

  public getDevices(): Device[] {
    return this.devices;
  }

  public getDeviceEntities(): DeviceEntity[] {
    return this.devices.map((device) => device.entity);
  }

  constructor(
    protected logger: Logger,
    protected processExecutionService: ProcessExecutionService,
    private _deviceFactory: (deviceData: DeviceEntity, deviceState: DeviceState) => Device) {
  }

  public async runDetection(): Promise<void> {
    const response = await this.executeListDevicesCommand()

    this.logger.debug("Detecting audio inputs.");
    this.devices = this.parseResponse(response);

    if (this.devices.length === 0) {
      this.logger.warn("No devices detected. Please check your sound cards.");
    }
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
    return this._deviceFactory(new DeviceEntity(id, description, deviceType), deviceState);
  }
}
