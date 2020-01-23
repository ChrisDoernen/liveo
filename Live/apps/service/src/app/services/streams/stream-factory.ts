import { StreamEntity } from "@live/entities";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Stream } from "./stream";

export const StreamFactory = (context: interfaces.Context) =>
  (streamEntity: StreamEntity) => {
    const logger = context.container.get<Logger>("Logger");

    return new Stream(logger, streamEntity);
  };
