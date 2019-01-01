import "reflect-metadata"; // This has to be imported first
import { container } from "./config/dependencies.config";
import { Types } from "./config/types.config";
import { Bootstrapper } from "./lib/core/bootstrapper";

const bootstrapper = container.get<Bootstrapper>(Types.Bootstrapper);
bootstrapper.startServer();
