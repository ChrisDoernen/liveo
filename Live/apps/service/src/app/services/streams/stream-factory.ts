import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Stream } from "./stream";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";
import { StreamEntity } from "@live/entities";

export const StreamFactory = (context: interfaces.Context) =>
  (streamEntity: StreamEntity) => {
    const logger = context.container.get<Logger>("Logger");
    const streamingSourceFactory = context.container.get<(deviceId: string) => IStreamingSource>("StreamingSourceFactory");

    return new Stream(logger, streamingSourceFactory, streamEntity);
  };
