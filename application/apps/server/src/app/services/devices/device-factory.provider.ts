import { DeviceEntity } from "@liveo/entities";
import { Logger } from "../logging/logger";
import { StreamingSourceFactory, StreamingSourceFactoryToken } from "../streaming-sources/streaming-source-factory";
import { Device } from "./device";
import { DeviceFactoryToken } from "./device-factory";

export const DeviceFactoryProvider = {
  provide: DeviceFactoryToken,
  useFactory(
    logger: Logger,
    streamingSourceFactory: StreamingSourceFactory
  ) {
    return (device: DeviceEntity) => {
      return new Device(logger, device, streamingSourceFactory);
    };
  },
  inject: [
    Logger,
    StreamingSourceFactoryToken
  ]
}