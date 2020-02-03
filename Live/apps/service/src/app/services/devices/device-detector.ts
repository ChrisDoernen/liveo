import { DeviceEntity, DeviceType } from "@live/entities";
import crypto from "crypto";
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

  constructor(
    protected logger: Logger,
    protected processExecutionService: ProcessExecutionService,
    private _deviceFactory: (deviceData: DeviceEntity, deviceState: DeviceState) => Device) {
  }

  public async runDetection(): Promise<Device[]> {
    const response = await this.executeListDevicesCommand()

    this.logger.debug("Detecting audio inputs.");
    const devices = this.parseResponse(response);

    if (devices.length === 0) {
      this.logger.warn("No devices detected. Please check your sound cards.");
    }

    return devices;
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

  protected instantiateDevice(id: string, description: string, deviceType: DeviceType, deviceState: DeviceState): Device {
    const hash = crypto.createHash("md5").update(id).digest("hex");
    const streamingSourceId = hash.substr(0, 7);
    
    return this._deviceFactory(new DeviceEntity(id, streamingSourceId, description, deviceType), deviceState);
  }
}
