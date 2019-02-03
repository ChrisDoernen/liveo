import { interfaces } from "inversify";
import { StreamData } from "./stream-data";
import { Logger } from "../logging/logger";
import { Stream } from "./stream";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";

export const StreamFactory = (context: interfaces.Context) =>
    (streamData: StreamData) => {
        const logger = context.container.get<Logger>("Logger");
        const streamingSourceFactory = context.container.get<(deviceId: string) => IStreamingSource>("StreamingSourceFactory");

        return new Stream(logger, streamingSourceFactory, streamData);
    };
