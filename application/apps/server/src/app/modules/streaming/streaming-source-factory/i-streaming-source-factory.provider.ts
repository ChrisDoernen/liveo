import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigToken } from "../../core/configuration/app-config";
import { StreamingSimulationSourceFactoryToken } from "../streaming-sources/streaming-simulation-source-factory";
import { StreamingSourceFactoryToken } from "../streaming-sources/streaming-source-factory";
import { IStreamingSourceFactory, IStreamingSourceFactoryToken } from "./i-streaming-source-factory";

export const IStreamingSourceFactoryProvider = {
  provide: IStreamingSourceFactoryToken,
  useFactory(
    configService: ConfigService,
    streamingSourceFactory: IStreamingSourceFactory,
    streamingSimulationSourceFactory: IStreamingSourceFactory
  ) {
    return () => {
      const appConfig = configService.get<AppConfig>(AppConfigToken);
      return appConfig.simulate ? streamingSimulationSourceFactory : streamingSourceFactory;
    };
  },
  inject: [
    ConfigService,
    StreamingSourceFactoryToken,
    StreamingSimulationSourceFactoryToken
  ]
}