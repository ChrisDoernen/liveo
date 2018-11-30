import { Types } from "./types.config";
import { IShutdownService } from "../core/system/i-shutdown-service";
import { ShutdownService } from "../core/system/shutdown-service";
import { ShutdownServiceSimulator } from "../core/system/shutdown-service-simulator";
import { Container } from "inversify";
import { Logger } from "../core/util/logger";
import * as serviceConfig from "../config/service.config";

const container = new Container();
if (serviceConfig.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownServiceSimulator);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownService);
}
container.bind<Logger>(Types.Logger).toSelf();

export { container };
