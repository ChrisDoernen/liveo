import { inject, injectable } from "inversify";
import { ActivationService } from "../activation/activation-service";
import { AdminService } from "../admin/admin.service";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";

@injectable()
export class DeviceService {

  private _devices: Device[];

  constructor(
    @inject("ActivationService") private readonly _activationService: ActivationService,
    @inject("AdminService") private readonly _adminService: AdminService,
    @inject("DeviceDetector") private readonly _deviceDetector: DeviceDetector) {
  }

  public async initialize(): Promise<void> {
    this._devices = await this._deviceDetector.runDetection();

    this._adminService.adminConnected$.subscribe((adminConnected) => {
      if (adminConnected) {
        this._devices.forEach((device) => device.startStreaming());
      } else {
        this._devices.forEach((device) => device.stopStreaming());
      }
    });
  }
}
