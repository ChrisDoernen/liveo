import { ConfigService } from "@nestjs/config";
import { AppConfig, APP_CONFIG_TOKEN } from "../../config/configuration";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/platform-constants";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { LinuxDeviceDetector } from "./linux-device-detector";
import { MacOSDeviceDetector } from "./macos-device-detector";
import { SimulationDeviceDetector } from "./simulation-device-detector";
import { WindowsDeviceDetector } from "./windows-device-detector";

export const DeviceDetectorFactory = {
  provide: DeviceDetector,
  useFactory: (
    configService: ConfigService,
    logger: Logger,
    platformConstants: PlatformConstants,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator
  ) => {
    const appConfig = configService.get<AppConfig>(APP_CONFIG_TOKEN);

    if (appConfig.simulate || appConfig.filesource) {
      return new SimulationDeviceDetector(logger, processExecutionService, idGenerator, null);
    }

    switch (appConfig.platform) {
      case "linux": {
        return new LinuxDeviceDetector(logger, platformConstants, processExecutionService, idGenerator, null);
      }
      case "win32": {
        return new WindowsDeviceDetector(logger, platformConstants, appConfig.ffmpegPath, processExecutionService, idGenerator, null);
      }
      case "win32": {
        return new MacOSDeviceDetector(logger, platformConstants, appConfig.ffmpegPath, processExecutionService, idGenerator, null);
      }
      default: {
        throw new Error(`OS ${appConfig.platform} is unsupported.`);
      }
    }
  },
  inject: [
    ConfigService,
    Logger,
    PlatformConstants,
    ProcessExecutionService,
    IdGenerator
  ]
};