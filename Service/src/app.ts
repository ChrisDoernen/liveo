import "reflect-metadata"; // This has to be imported first
import { container } from "./config/container";
import { Bootstrapper } from "./lib/core/bootstrapper";

const bootstrapper = container.get<Bootstrapper>("Bootstrapper");
bootstrapper.startServer();
