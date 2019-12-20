import "reflect-metadata"; // This has to be imported first
import "./dotenv";
import { container } from "./app/config/container";
import { Bootstrapper } from "./app/core/bootstrapper";

const bootstrapper = container.get<Bootstrapper>("Bootstrapper");
bootstrapper.startServer(container);

process.on("exit", () => bootstrapper.stopServer());
