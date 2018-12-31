import { Logger } from "../core/util/logger";
import { ProcessdExecutionService } from "../core/system/child-processes/process-execution-service";
import { SessionService } from "../core/sessions/session-service";
import { DataService } from "../core/data/data-service";
import { StreamService } from "../core/streams/stream-service";
import { WebsocketService } from "../core/websocket/websocket-service";
import { StreamingSource } from "../core/streams/streaming-source";

export const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Logger: Logger,
    ProcessExecutionService: ProcessdExecutionService,
    SessionService: SessionService,
    StreamService: StreamService,
    DataService: DataService,
    WebsocketService: WebsocketService,
    StreamingSource: StreamingSource,
    StreamFactory: "StreamFactory",
    SessionFactory: "SessionFactory",
    DeviceFactory: "DeviceFactory",
    StreamingSourceFactory: "StreamingSourceFactory"
};
