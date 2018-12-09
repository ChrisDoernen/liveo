import { Types } from "./types.config";
import { IShutdownService } from "../core/system/shutdown/i-shutdown-service";
import { LinuxShutdownService } from "../core/system/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../core/system/shutdown/shutdown-simulation-service";
import { Container } from "inversify";
import { Logger } from "../core/util/logger";
import { config } from "./service.config";
import { CommandExecutionService } from "../core/system/command-execution-service";
import { IDeviceDetector } from "../core/system/devices/i-device-detector";
import { LinuxDeviceDetector } from "../core/system/devices/linux-device-detector";

export const container = new Container();

if (config.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownSimulationService);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(LinuxShutdownService);
}

if (config.os === "linux") {
    container.bind<IDeviceDetector>(Types.IDeviceDetector).to(LinuxDeviceDetector).inSingletonScope();
} else {
    throw new Error("OS is unsupported.");
}

container.bind<Logger>(Types.Logger).toSelf();
container.bind<CommandExecutionService>(Types.CommandExecutionService).to(CommandExecutionService);
