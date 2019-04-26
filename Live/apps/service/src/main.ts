import "reflect-metadata"; // This has to be imported first
import { container } from "./app/config/container";
import { Bootstrapper } from "./app/lib/core/bootstrapper";

const bootstrapper = container.get<Bootstrapper>("Bootstrapper");
bootstrapper.startServer(container);
