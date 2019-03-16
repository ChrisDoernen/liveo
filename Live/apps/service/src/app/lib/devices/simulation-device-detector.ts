import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection that always returnes valid devices
 */
@injectable()
export class SimulationDeviceDetector implements IDeviceDetector {

  private _devices: Device[] = [];

  public get devices(): Device[] {
    return this._devices;
  }

  constructor(@inject("Logger") private _logger: Logger,
    @inject("DeviceFactory") private _deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
    this._logger.info("Instantiating simulation device detector.");
  }

  public async detectDevices(): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      resolve();
    });
  }

  public getDevice(id: string): Device {
    this._logger.info("Simulation device detection.");
    return this._deviceFactory(new DeviceData(id, "Test device"), DeviceState.Available);
  }
}
