import { DeviceEntity, DeviceType } from "@liveo/entities";
import { EOL } from "os";
import { Logger } from "../../../core/services/logging/logger";
import { PlatformConstants } from "../../../shared/platform-constants/platform-constants";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { ProcessExecutionService } from "../../../shared/services/process-execution/process-execution-service";
import { Device } from "../../device/device";
import { DeviceDetector } from "./device-detector";

export class WindowsDeviceDetector extends DeviceDetector {

  constructor(
    logger: Logger,
    plattformConstants: PlatformConstants,
    ffmpegPath: string,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator,
    deviceFactory: (deviceEntity: DeviceEntity) => Device
  ) {
    super(logger, processExecutionService, idGenerator, deviceFactory);
    this.listDevicesCommand = `"${ffmpegPath}" -f ${plattformConstants.audioModule} -list_devices true -i '' -hide_banner`;
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
          const deviceType = isVideo ? DeviceType.Video : DeviceType.Audio;
          devices.push(this.instantiateDevice(id, name, deviceType));
        }
      });

    return devices;
  }
}
