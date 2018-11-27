import { Types } from "./types.config";
import { IShutdownService } from "../core/i-shutdown-service";
import { ShutdownService } from "../core/shutdown-service";
import { Container } from "inversify";

const container = new Container();
container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownService);

export { container };
