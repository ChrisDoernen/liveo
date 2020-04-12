import { Module } from "@nestjs/common";
import { SettingsModule } from "../settings/settings.module";
import { SharedModule } from "../shared/shared.module";
import { StreamingGateway } from "./gateways/streaming.gateway";
import { FFmpegLogger } from "./services/ffmpeg-logger";
import { IStreamingSourceFactoryToken } from "./streaming-source-factory/i-streaming-source-factory";
import { IStreamingSourceFactoryProvider } from "./streaming-source-factory/i-streaming-source-factory.provider";
import { StreamingSimulationSourceFactoryProvider } from "./streaming-sources/streaming-simulation-source-factory.provider";
import { StreamingSourceFactoryProvider } from "./streaming-sources/streaming-source-factory.provider";

@Module({
  imports: [
    SharedModule,
    SettingsModule
  ],
  providers: [
    FFmpegLogger,
    IStreamingSourceFactoryProvider,
    StreamingGateway,
    StreamingSimulationSourceFactoryProvider,
    StreamingSourceFactoryProvider
  ],
  exports: [
    IStreamingSourceFactoryToken
  ]
})
export class StreamingModule { }