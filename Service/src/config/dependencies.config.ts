import { Types } from "./types.config";
import { IShutdownService } from "../core/system/i-shutdown-service";
import { ShutdownService } from "../core/system/shutdown-service";
import { ShutdownServiceSimulator } from "../core/system/shutdown-service-simulator";
import { Container } from "inversify";
import { Logger } from "../core/util/logger";
import * as serviceConfig from "./service.config";
import { CommandExecutionService } from "../core/system/command-execution-service";
import { IDeviceDetector } from "../core/system/devices/i-device-detector";
import { LinuxDeviceDetector } from "../core/system/devices/linux-device-detector";

const container = new Container();

if (serviceConfig.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownServiceSimulator);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownService);
}

container.bind<Logger>(Types.Logger).toSelf();

if (serviceConfig.os === "linux") {
    container.bind<IDeviceDetector>(Types.IDeviceDetector).to(LinuxDeviceDetector).inSingletonScope();
} else {
    throw new Error("OS is unsupported.");
}

container.bind<CommandExecutionService>(Types.CommandExecutionService).to(CommandExecutionService);

export { container };
