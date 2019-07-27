import { DeviceDetector } from "./device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";
import { EOL } from "os";
import { DeviceType } from "./device-type";
import * as Ffmpeg from "fluent-ffmpeg"

@injectable()
export class WindowsDeviceDetector extends DeviceDetector {

  constructor(
    @inject("Logger") logger: Logger,
    @inject("DeviceFactory") deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
    super(logger, deviceFactory);
  }

  public async detectDevices(): Promise<void> {
    return this.runDetection();
  }

  protected async executeListDevicesCommand(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const command = Ffmpeg()
      .input("''")
    });
  }

  protected parseResponse(response: string): Device[] {
    const prefix = /\[dshow/;
    const audioSeparator = /DirectShow\saudio\sdevices/;
    const alternativeName = /Alternative\sname\s*?\"(.*?)\"/;
    const deviceParams = /\"(.*?)\"/;
    const searchPrefix = (line: string) => (line.search(prefix) > -1);
    const searchAudioSeparator = (line: string) => isVideo && (line.search(audioSeparator) > -1);
    const searchAlternativeName = (line) => (line.search(/Alternative\sname/) > -1);

    const devices = [];
    let isVideo = true;

    response.split(EOL)
      .filter(searchPrefix)
      .forEach((line) => {
        if (searchAudioSeparator(line)) {
          isVideo = false;
          return;
        }
        if (searchAlternativeName(line)) {
          const lastDevice = devices[devices.length - 1];
          lastDevice.alternativeName = line.match(alternativeName)[1];
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
