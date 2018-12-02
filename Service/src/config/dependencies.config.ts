import { Types } from "./types.config";
import { IShutdownService } from "../core/system/i-shutdown-service";
import { ShutdownService } from "../core/system/shutdown-service";
import { ShutdownServiceSimulator } from "../core/system/shutdown-service-simulator";
import { Container } from "inversify";
import { Logger } from "../core/util/logger";
import * as serviceConfig from "./service.config";
import { DeviceDetector } from "../core/system/device-detector";
import { CommandExecutor } from "../core/system/command-executor";

const container = new Container();
if (serviceConfig.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownServiceSimulator);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownService);
}
container.bind<Logger>(Types.Logger).toSelf();
container.bind<DeviceDetector>(Types.AudioInputDetector).to(DeviceDetector).inSingletonScope();
container.bind<CommandExecutor>(Types.CommandExecutionService).to(CommandExecutor);

export { container };
