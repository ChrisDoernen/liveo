import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";
import { EOL } from 'os';
import { DeviceType } from './device-type';

/**
 * Implementation of device detection on mac os
 */
@injectable()
export class MacOSDeviceDetector extends DeviceDetector {
  private listDevicesCommand: string = "ffmpeg -f avfoundation -list_devices true -i ''";

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
        resolve(stderr);
      });
    });
  }

  protected parseResponse(response: string): Device[] {
    const prefix = /^\[AVFoundation/;
    const audioSeparator = /AVFoundation\saudio\sdevices/;
    const deviceParams = /^\[AVFoundation.*?\]\s\[(\d*?)\]\s(.*)$/;
    const searchPrefix = (line: string) => (line.search(prefix) > -1);
    const searchAudioSeparator = (line: string) => isVideo && (line.search(audioSeparator) > -1);

    let devices = [];
    let isVideo = true;

    response.split(EOL)
      .filter(searchPrefix)
      .forEach((line) => {
        if (searchAudioSeparator(line)) {
          isVideo = false;
          return;
        }
        const params = line.match(deviceParams);
        if (params) {
          const id = params[1];
          const name = params[2]
          const deviceType = isVideo ? DeviceType.Video : DeviceType.Audio
          devices.push(this.instantiateDevice(id, name, deviceType, DeviceState.Available));
        }
      });

    return devices;
  }
}
