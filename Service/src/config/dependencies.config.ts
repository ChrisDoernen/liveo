import { Types } from "./types.config";
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

export const container = new Container();

if (config.os === "linux") {
    container.bind<IDeviceDetector>(Types.IDeviceDetector).to(LinuxDeviceDetector).inSingletonScope();
} else {
    throw new Error("OS is unsupported.");
}

if (config.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownSimulationService);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(LinuxShutdownService);
}

container.bind<interfaces.Factory<StreamingSource>>(Types.StreamingSourceFactory).toFactory(StreamingSourceFactory);
container.bind<interfaces.Factory<Device>>(Types.DeviceFactory).toFactory(DeviceFactory);
container.bind<interfaces.Factory<Stream>>(Types.StreamFactory).toFactory(StreamFactory);
container.bind<interfaces.Factory<Session>>(Types.SessionFactory).toFactory(SessionFactory);

container.bind<Logger>(Types.Logger).toSelf();
container.bind<DataService>(Types.DataService).to(DataService);
container.bind<StreamService>(Types.StreamService).to(StreamService).inSingletonScope();
container.bind<SessionService>(Types.SessionService).to(SessionService).inSingletonScope();
container.bind<ProcessdExecutionService>(Types.ProcessExecutionService).to(ProcessdExecutionService);
container.bind<WebsocketServer>(Types.WebsocketServer).to(WebsocketServer).inSingletonScope();
