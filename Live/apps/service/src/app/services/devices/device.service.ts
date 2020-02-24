import { DeviceEntity, DeviceType } from "@live/entities";
import { inject, injectable } from "inversify";
import { distinctUntilChanged } from "rxjs/operators";
import { AdminService } from "../admin/admin.service";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";

@injectable()
export class DeviceService {

  private _devices: Device[] = [];

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("ActivationStateService") private readonly _activationStateService: ActivationStateService,
    @inject("AdminService") private readonly _adminService: AdminService,
    @inject("DeviceDetector") private readonly _deviceDetector: DeviceDetector) {
  }

  public async initialize(): Promise<void> {
    this._devices = await this.detectDevices();

    this._activationStateService.activationState$
      .subscribe((activationState) => {
        if (activationState.state !== "NoActivation") {
          const streamingIds = activationState.streams.map((stream) => stream.streamingId);
          this._devices
            .filter((device) => this.isAudioDevice(device))
            .filter((device) => !!streamingIds.find((streamingId) => streamingId === device.entity.streamingId))
            .forEach((device) => device.startStreaming());
        } else {
          this._devices.forEach((device) => device.stopStreaming());
        }
      });

    this._adminService.adminStreamCreation$
      .pipe(distinctUntilChanged())
      .subscribe((streamCreation) => {
        if (streamCreation) {
          this._devices
            .filter((device) => this.isAudioDevice(device))
            .forEach((device) => device.startStreaming());
        } else {
          this._devices.forEach((device) => device.stopStreaming());
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
      const newDevices = devices.filter((device) => !existingDeviceIds.find((id) => id === device.id));
      const newAudioDevices = newDevices.filter((device) => this.isAudioDevice(device));
      newAudioDevices.forEach((device) => device.startStreaming());
      this._devices.push(...newDevices);
    }

    return this._devices
      .filter((device) => this.isAudioDevice(device))
      .map((device) => device.entity);
  }

  private isAudioDevice(device: Device): boolean {
    return device.entity.deviceType === DeviceType.Audio
  }
}
