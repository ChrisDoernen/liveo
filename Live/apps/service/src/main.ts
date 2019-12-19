import "reflect-metadata"; // This has to be imported first
import { container } from "./app/config/container";
import { Bootstrapper } from "./app/core/bootstrapper";
import { join } from "path";
import { config } from "dotenv";

const envPath = join(process.cwd(), "live.env");
const dotenv = config({ path: envPath, debug: true });
if (dotenv.error) {
  throw dotenv.error;
}

const bootstrapper = container.get<Bootstrapper>("Bootstrapper");
bootstrapper.startServer(container);

process.on("exit", () => bootstrapper.stopServer());
