import { Module } from "@nestjs/common";
import { StreamingGateway } from "./gateways/streaming.gateway";
import { IStreamingSourceFactoryProvider } from "./streaming-source-factory/i-streaming-source-factory.provider";
import { StreamingSimulationSourceFactoryProvider } from "./streaming-sources/streaming-simulation-source-factory.provider";
import { StreamingSourceFactoryProvider } from "./streaming-sources/streaming-source-factory.provider";

@Module({
  imports: [
  ],
  providers: [
    StreamingSimulationSourceFactoryProvider,
    StreamingSourceFactoryProvider,
    IStreamingSourceFactoryProvider,
    StreamingGateway
  ]
})
export class StreamingModule { }