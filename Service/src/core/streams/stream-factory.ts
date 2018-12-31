import { interfaces } from "inversify";
import { Types } from "../../config/types.config";
import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { Stream } from "./stream";
import { WebsocketService } from "../websocket/websocket-service";
import { StreamingSource } from "./streaming-source";

export const StreamFactory = (context: interfaces.Context) =>
    (streamData: StreamData) => {
        const logger = context.container.get<Logger>(Types.Logger);
        const websocketService = context.container.get<WebsocketService>(Types.WebsocketService);
        const streamingSourceFactory = context.container.get<(deviceId: string) => StreamingSource>(Types.StreamingSourceFactory);

        return new Stream(logger, websocketService, streamingSourceFactory, streamData);
    };
