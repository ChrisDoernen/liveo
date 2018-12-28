import { Types } from "./types.config";
import { IShutdownService } from "../core/system/shutdown/i-shutdown-service";
import { LinuxShutdownService } from "../core/system/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../core/system/shutdown/shutdown-simulation-service";
import { Container, interfaces } from "inversify";
import { Logger } from "../core/util/logger";
import { config } from "./service.config";
import { CommandExecutionService } from "../core/system/command-execution-service";
import { IDeviceDetector } from "../core/system/devices/i-device-detector";
import { LinuxDeviceDetector } from "../core/system/devices/linux-device-detector";
import { DataService } from "../core/data/data-service";
import { SessionService } from "../core/sessions/session-service";
import { StreamService } from "../core/streams/stream-service";
import { WebsocketService } from "../core/websocket/websocket-service";
import { Stream } from "../core/streams/stream";
import { StreamEntity } from "../core/streams/stream-entity";
import { Session } from "../core/sessions/session";
import { SessionEntity } from "../core/sessions/session-entity";

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
container.bind<CommandExecutionService>(Types.CommandExecutionService).to(CommandExecutionService);
container.bind<DataService>(Types.DataService).to(DataService);
container.bind<SessionService>(Types.SessionService).to(SessionService).inSingletonScope();
container.bind<StreamService>(Types.StreamService).to(StreamService).inSingletonScope();
container.bind<WebsocketService>(Types.WebsocketService).to(WebsocketService).inSingletonScope();

container.bind<interfaces.Factory<Stream>>(Types.StreamFactory).toFactory((context) =>
    (streamEntity: StreamEntity) => {
        const logger = context.container.get<Logger>(Types.Logger);
        return new Stream(logger, streamEntity);
    }
);

container.bind<interfaces.Factory<Session>>(Types.SessionFactory).toFactory((context) =>
    (sessionEntity: SessionEntity, streams: Stream[]) => {
        const logger = context.container.get<Logger>(Types.Logger);
        return new Session(logger, sessionEntity, streams);
    }
);
