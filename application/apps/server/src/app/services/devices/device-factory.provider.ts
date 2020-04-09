import { DeviceEntity } from "@liveo/entities";
import { Logger } from "../logging/logger";
import { IStreamingSourceFactory, IStreamingSourceFactoryToken } from "../streaming-sources/i-streaming-source-factory";
import { Device } from "./device";
import { DeviceFactoryToken } from "./device-factory";

export const DeviceFactoryProvider = {
  provide: DeviceFactoryToken,
  useFactory(
    logger: Logger,
    streamingSourceFactory: IStreamingSourceFactory
  ) {
    return (device: DeviceEntity) => {
      return new Device(logger, device, streamingSourceFactory);
    };
  },
  inject: [
    Logger,
    IStreamingSourceFactoryToken
  ]
}