import { Logger } from "../lib/util/logger";
import { ProcessdExecutionService } from "../lib/system/child-processes/process-execution-service";
import { SessionService } from "../lib/sessions/session-service";
import { DataService } from "../lib/data/data-service";
import { StreamService } from "../lib/streams/stream-service";
import { WebsocketServer } from "../lib/core/websocket-server";
import { StreamingSource } from "../lib/streams/streaming-source";
import { Bootstrapper } from "../lib/core/bootstrapper";

export const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Bootstrapper: Bootstrapper,
    Logger: Logger,
    ProcessExecutionService: ProcessdExecutionService,
    SessionService: SessionService,
    StreamService: StreamService,
    DataService: DataService,
    WebsocketServer: WebsocketServer,
    StreamingSource: StreamingSource,
    StreamFactory: "StreamFactory",
    SessionFactory: "SessionFactory",
    DeviceFactory: "DeviceFactory",
    StreamingSourceFactory: "StreamingSourceFactory"
};
