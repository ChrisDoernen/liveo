import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { ApplicationStateController } from "./controller/application-state.controller";
import { ConnectionController } from "./controller/connection.controller";
import { DevicesController } from "./controller/devices.controller";
import { SessionsController } from "./controller/sessions.controller";
import { SettingsController } from "./controller/settings.controller";
import { ShutdownController } from "./controller/shutdown.controller";
import { StreamsController } from "./controller/streams.controller";
import { AdminGateway } from "./gateways/admin.gateway";
import { StreamingGateway } from "./gateways/streaming.gateway";
import { FallbackRoutesMiddleware } from "./middleware/routing/fallback-routes.middleware";
import { ActivationService } from "./services/activation/activation-service";
import { AutoActivationService } from "./services/activation/auto-activation-service";
import { AdminService } from "./services/admin/admin.service";
import { ActivationStateService } from "./services/application-state/activation-state.service";
import { AuthenticationService } from "./services/authentication/authentication-service";
import { UserProvider } from "./services/authentication/user-provider";
import { DataService } from "./services/data/data-service";
import { DeviceDetectorProvider } from "./services/devices/device-detector.provider";
import { DeviceFactoryProvider } from "./services/devices/device-factory.provider";
import { DeviceService } from "./services/devices/device.service";
import { IdGenerator } from "./services/id-generation/id-generator";
import { Logger } from "./services/logging/logger";
import { PlatformConstantsProvider } from "./services/platform-constants/platform-constants.provider";
import { ProcessExecutionService } from "./services/process-execution/process-execution-service";
import { Scheduler } from "./services/scheduling/scheduler";
import { SessionRepository } from "./services/sessions/session-repository";
import { SessionService } from "./services/sessions/session-service";
import { SettingsProvider } from "./services/settings/settings-provider";
import { SettingsService } from "./services/settings/settings-service";
import { ShutdownService } from "./services/shutdown/shutdown-service";
import { ConnectionHistoryService } from "./services/statistics/connection-history-service";
import { IStreamingSourceFactoryProvider } from "./services/streaming-sources/i-streaming-source-factory.provider";
import { StreamingSimulationSourceFactoryProvider } from "./services/streaming-sources/streaming-simulation-source-factory.provider";
import { StreamingSourceFactoryProvider } from "./services/streaming-sources/streaming-source-factory.provider";
import { StreamRepository } from "./services/streams/stream-repository";
import { StreamService } from "./services/streams/stream-service";
import { SystemMonitoringService } from "./services/system-monitoring/system-monitoring-service";
import { TimeService } from "./services/time/time.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "liveo.env",
      load: [configuration]
    })
  ],
  controllers: [
    ApplicationStateController,
    ConnectionController,
    SessionsController,
    DevicesController,
    SettingsController,
    ShutdownController,
    StreamsController
  ],
  providers: [
    ActivationService,
    ActivationStateService,
    AdminGateway,
    AdminService,
    AuthenticationService,
    AutoActivationService,
    ConnectionHistoryService,
    DataService,
    DeviceService,
    DeviceDetectorProvider,
    DeviceFactoryProvider,
    IStreamingSourceFactoryProvider,
    IdGenerator,
    Logger,
    PlatformConstantsProvider,
    ProcessExecutionService,
    Scheduler,
    SessionRepository,
    SessionService,
    SettingsProvider,
    SettingsService,
    ShutdownService,
    StreamRepository,
    StreamService,
    StreamingGateway,
    StreamingSimulationSourceFactoryProvider,
    StreamingSourceFactoryProvider,
    SystemMonitoringService,
    TimeService,
    UserProvider
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FallbackRoutesMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
