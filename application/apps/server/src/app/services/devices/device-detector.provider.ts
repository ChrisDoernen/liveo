import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigToken } from "../../config/configuration";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/platform-constants";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceDetector } from "./device-detector";
import { DeviceFactory } from "./device-factory";
import { LinuxDeviceDetector } from "./linux-device-detector";
import { MacOSDeviceDetector } from "./macos-device-detector";
import { SimulationDeviceDetector } from "./simulation-device-detector";
import { WindowsDeviceDetector } from "./windows-device-detector";

export const DeviceDetectorProvider = {
  provide: DeviceDetector,
  useFactory: (
    configService: ConfigService,
    logger: Logger,
    devicefactory: DeviceFactory,
    platformConstants: PlatformConstants,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator
  ) => {
    const appConfig = configService.get<AppConfig>(AppConfigToken);

    if (appConfig.simulate) {
      return new SimulationDeviceDetector(logger, processExecutionService, idGenerator, devicefactory);
    }

    switch (appConfig.platform) {
      case "linux": {
        return new LinuxDeviceDetector(logger, platformConstants, processExecutionService, idGenerator, devicefactory);
      }
      case "win32": {
        return new WindowsDeviceDetector(logger, platformConstants, appConfig.ffmpegPath, processExecutionService, idGenerator, devicefactory);
      }
      case "darwin": {
        return new MacOSDeviceDetector(logger, platformConstants, appConfig.ffmpegPath, processExecutionService, idGenerator, devicefactory);
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