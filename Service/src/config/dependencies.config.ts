import { Types } from "./types.config";
import { IShutdownService } from "../core/system/shutdown/i-shutdown-service";
import { LinuxShutdownService } from "../core/system/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../core/system/shutdown/shutdown-simulation-service";
import { Container, interfaces } from "inversify";
import { Logger } from "../core/util/logger";
import { config } from "./service.config";
import { SimpleProcessdExecutionService } from "../core/system/child-processes/simple-process-execution-service";
import { IDeviceDetector } from "../core/system/devices/i-device-detector";
import { LinuxDeviceDetector } from "../core/system/devices/linux-device-detector";
import { DataService } from "../core/data/data-service";
import { SessionService } from "../core/sessions/session-service";
import { StreamService } from "../core/streams/stream-service";
import { WebsocketService } from "../core/websocket/websocket-service";
import { Stream } from "../core/streams/stream";
import { Session } from "../core/sessions/session";
import { Device } from "../core/system/devices/device";
import { DeviceFactory } from "../core/system/devices/device-factory";
import { SessionFactory } from "../core/sessions/session-factory";
import { StreamFactory } from "../core/streams/stream-facrtory";

export const container = new Container();

if (config.environment === "Development") {
    container.bind<IShutdownService>(Types.IShutdownService).to(ShutdownSimulationService);
} else {
    container.bind<IShutdownService>(Types.IShutdownService).to(LinuxShutdownService);
}

if (config.os === "linux") {
    container.bind<IDeviceDetector>(Types.IDeviceDetector).to(LinuxDeviceDetector).inSingletonScope();
} else {
    throw new Error("OS is unsupported.");
}

container.bind<Logger>(Types.Logger).toSelf();
container.bind<SimpleProcessdExecutionService>(Types.CommandExecutionService).to(SimpleProcessdExecutionService);
container.bind<DataService>(Types.DataService).to(DataService);
container.bind<SessionService>(Types.SessionService).to(SessionService).inSingletonScope();
container.bind<StreamService>(Types.StreamService).to(StreamService).inSingletonScope();
container.bind<WebsocketService>(Types.WebsocketService).to(WebsocketService).inSingletonScope();
container.bind<interfaces.Factory<Stream>>(Types.StreamFactory).toFactory(StreamFactory);
container.bind<interfaces.Factory<Session>>(Types.SessionFactory).toFactory(SessionFactory);
container.bind<interfaces.Factory<Device>>(Types.DeviceFactory).toFactory(DeviceFactory);
