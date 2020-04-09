import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigToken } from "../../config/configuration";
import { IStreamingSourceFactory, IStreamingSourceFactoryToken } from "./i-streaming-source-factory";
import { StreamingSimulationSourceFactoryToken } from "./streaming-simulation-source-factory";
import { StreamingSourceFactoryToken } from "./streaming-source-factory";

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