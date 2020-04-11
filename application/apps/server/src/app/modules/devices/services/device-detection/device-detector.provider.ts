import { AppConfig } from "../../../core/configuration/app-config";
import { Logger } from "../../../core/services/logging/logger";
import { PlatformConstants } from "../../../shared/platform-constants/platform-constants";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { ProcessExecutionService } from "../../../shared/services/process-execution/process-execution-service";
import { DeviceFactory, DeviceFactoryToken } from "../../device/device-factory";
import { DeviceDetector } from "./device-detector";
import { LinuxDeviceDetector } from "./linux-device-detector";
import { MacOSDeviceDetector } from "./macos-device-detector";
import { SimulationDeviceDetector } from "./simulation-device-detector";
import { WindowsDeviceDetector } from "./windows-device-detector";

export const DeviceDetectorProvider = {
  provide: DeviceDetector,
  useFactory: (
    appConfig: AppConfig,
    logger: Logger,
    devicefactory: DeviceFactory,
    platformConstants: PlatformConstants,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator
  ) => {
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
    AppConfig,
    Logger,
    DeviceFactoryToken,
    PlatformConstants,
    ProcessExecutionService,
    IdGenerator
  ]
};