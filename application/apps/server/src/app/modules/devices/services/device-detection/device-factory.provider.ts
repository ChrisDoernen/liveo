import { DeviceEntity } from "@liveo/entities";
import { IStreamingSourceFactory, IStreamingSourceFactoryToken } from "apps/server/src/app/modules/streaming/streaming-source-factory/i-streaming-source-factory";
import { Logger } from "../../../core/services/logging/logger";
import { Device } from "../../device/device";
import { DeviceFactoryToken } from "../../device/device-factory";

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