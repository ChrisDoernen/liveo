import { StreamingGateway } from "../../gateways/streaming.gateway";
import { Logger } from "../logging/logger";
import { StreamingSimulationSource } from "./streaming-simulation-source";
import { StreamingSimulationSourceFactoryToken } from "./streaming-simulation-source-factory";

export const StreamingSimulationSourceFactoryProvider = {
  provide: StreamingSimulationSourceFactoryToken,
  useFactory(
    logger: Logger,
    streamingGateway: StreamingGateway
  ) {
    return (deviceId: string, streamingId: string, onError: (error: Error) => void) => {
      return new StreamingSimulationSource(logger, streamingGateway, deviceId, streamingId);
    };
  },
  inject: [
    Logger,
    StreamingGateway
  ]
}