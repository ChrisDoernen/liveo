import { IShutdownService } from "../lib/system/shutdown/i-shutdown-service";
import { LinuxShutdownService } from "../lib/system/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../lib/system/shutdown/shutdown-simulation-service";
import { Container, interfaces } from "inversify";
import { Logger } from "../lib/util/logger";
import { config } from "./service.config";
import { ProcessdExecutionService } from "../lib/system/child-processes/process-execution-service";
import { IDeviceDetector } from "../lib/system/devices/i-device-detector";
import { LinuxDeviceDetector } from "../lib/system/devices/linux-device-detector";
import { DataService } from "../lib/data/data-service";
import { SessionService } from "../lib/sessions/session-service";
import { StreamService } from "../lib/streams/stream-service";
import { WebsocketServer } from "../lib/core/websocket-server";
import { Stream } from "../lib/streams/stream";
import { Session } from "../lib/sessions/session";
import { Device } from "../lib/system/devices/device";
import { DeviceFactory } from "../lib/system/devices/device-factory";
import { SessionFactory } from "../lib/sessions/session-factory";
import { StreamFactory } from "../lib/streams/stream-factory";
import { StreamingSource } from "../lib/streams/streaming-source";
import { StreamingSourceFactory } from "../lib/streams/streaming-source-factory";
import { Bootstrapper } from "../lib/core/bootstrapper";
import { WebServer } from "../lib/core/web-server";

export const container = new Container();

if (config.os === "linux") {
    container.bind<IDeviceDetector>("IDeviceDetector").to(LinuxDeviceDetector).inSingletonScope();
} else {
    throw new Error("OS is unsupported.");
}

if (config.environment === "Development") {
    container.bind<IShutdownService>("IShutdownService").to(ShutdownSimulationService);
} else {
    container.bind<IShutdownService>("IShutdownService").to(LinuxShutdownService);
}

container.bind<interfaces.Factory<StreamingSource>>("StreamingSourceFactory").toFactory(StreamingSourceFactory);
container.bind<interfaces.Factory<Device>>("DeviceFactory").toFactory(DeviceFactory);
container.bind<interfaces.Factory<Stream>>("StreamFactory").toFactory(StreamFactory);
container.bind<interfaces.Factory<Session>>("SessionFactory").toFactory(SessionFactory);

container.bind<Logger>("Logger").to(Logger);
container.bind<Bootstrapper>("Bootstrapper").to(Bootstrapper);
container.bind<DataService>("DataService").to(DataService);
container.bind<StreamService>("StreamService").to(StreamService).inSingletonScope();
container.bind<SessionService>("SessionService").to(SessionService).inSingletonScope();
container.bind<ProcessdExecutionService>("ProcessExecutionService").to(ProcessdExecutionService);
container.bind<WebServer>("WebServer").to(WebServer).inSingletonScope();
container.bind<WebsocketServer>("WebsocketServer").to(WebsocketServer).inSingletonScope();
