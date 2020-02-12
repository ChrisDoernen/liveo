import { DeviceEntity, DeviceType } from "@live/entities";
import { inject, injectable } from "inversify";
import { combineLatest, Subscription } from "rxjs";
import { map, distinctUntilChanged, skip } from "rxjs/operators";
import { ActivationService } from "../activation/activation-service";
import { AdminService } from "../admin/admin.service";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";

@injectable()
export class DeviceService {

  private _devices: Device[] = [];
  private _subscription: Subscription;

  constructor(
    @inject("ActivationService") private readonly _activationService: ActivationService,
    @inject("AdminService") private readonly _adminService: AdminService,
    @inject("DeviceDetector") private readonly _deviceDetector: DeviceDetector) {
  }

  public async initialize(): Promise<void> {
    this._devices = await this.detectDevices();

    const admin$ = this._adminService.adminConnected$;
    const activation$ = this._activationService.activation$;
    this._subscription = combineLatest([admin$, activation$])
      .pipe(
        map(([admin, activation]) => admin || !!activation),
        distinctUntilChanged(),
        skip(1)
      )
      .subscribe((shouldStream) => {
        const audioDevices = this._devices.filter((device) => device.entity.deviceType === DeviceType.Audio);
        if (shouldStream) {
          audioDevices.forEach((device) => device.startStreaming());
        } else {
          audioDevices.forEach((device) => device.stopStreaming());
        }
      });
  }

  private async detectDevices(): Promise<Device[]> {
    return await this._deviceDetector.runDetection();
  }

  public async getDeviceEntities(redetect: boolean = false): Promise<DeviceEntity[]> {
    if (redetect) {
      const devices = await this.detectDevices();

      // Find new devices, start them
      const existingDeviceIds = this._devices.map((device) => device.id);
      const newDevices = devices.filter((device) => existingDeviceIds.indexOf(device.id) === -1);
      const newAudioDevices = newDevices.filter((device) => device.entity.deviceType === DeviceType.Audio);
      newAudioDevices.forEach((device) => device.startStreaming());
      this._devices = devices;
    }

    return this._devices.map((device) => device.entity);
  }
}
