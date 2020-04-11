import { AppConfig } from "../../core/configuration/app-config";
import { StreamingSimulationSourceFactoryToken } from "../streaming-sources/streaming-simulation-source-factory";
import { StreamingSourceFactoryToken } from "../streaming-sources/streaming-source-factory";
import { IStreamingSourceFactory, IStreamingSourceFactoryToken } from "./i-streaming-source-factory";

export const IStreamingSourceFactoryProvider = {
  provide: IStreamingSourceFactoryToken,
  useFactory(
    appConfig: AppConfig,
    streamingSourceFactory: IStreamingSourceFactory,
    streamingSimulationSourceFactory: IStreamingSourceFactory
  ) {
    return () => {
      return appConfig.simulate ? streamingSimulationSourceFactory : streamingSourceFactory;
    };
  },
  inject: [
    AppConfig,
    StreamingSourceFactoryToken,
    StreamingSimulationSourceFactoryToken
  ]
}