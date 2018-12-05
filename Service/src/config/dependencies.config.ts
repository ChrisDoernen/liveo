import { Types } from "./types.config";
import { IShutdownService } from "../core/system/i-shutdown-service";
import { ShutdownService } from "../core/system/shutdown-service";
import { ShutdownServiceSimulator } from "../core/system/shutdown-service-simulator";
import { Container } from "inversify";
import { Logger } from "../core/util/logger";
import * as serviceConfig from "./service.config";
import { WindowsDeviceDetector } from "../core/system/devices/windows-device-detector";
import { CommandExecutionService } from "../core/system/command-execution-service";

const container = new Container();
if (serviceConfig.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownServiceSimulator);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownService);
}
container.bind<Logger>(Types.Logger).toSelf();
//container.bind<WindowsDeviceDetector>(Types.AudioInputDetector).to(WindowsDeviceDetector).inSingletonScope();
container.bind<CommandExecutionService>(Types.CommandExecutionService).to(CommandExecutionService);

export { container };
