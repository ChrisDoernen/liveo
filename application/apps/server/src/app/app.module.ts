import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApplicationStateController } from "./controller/application-state.controller";
import { ConnectionController } from "./controller/connection.controller";
import { ShutdownController } from "./controller/shutdown.controller";
import { AdminGateway } from "./gateways/admin.gateway";
import { FallbackRoutesMiddleware } from "./middleware/routing/fallback-routes.middleware";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { configuration } from "./modules/core/configuration/configuration";
import { DevicesModule } from "./modules/devices/devices.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { StatisticsModule } from "./modules/statistics/statistics.module";
import { StreamingModule } from "./modules/streaming/streaming.module";
import { StreamsModule } from "./modules/streams/streams.module";
import { ActivationService } from "./services/activation/activation-service";
import { AutoActivationService } from "./services/activation/auto-activation-service";
import { AdminService } from "./services/admin/admin.service";
import { ActivationStateService } from "./services/application-state/activation-state.service";
import { SystemMonitoringService } from "./services/system-monitoring/system-monitoring-service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "liveo.env",
      load: [configuration]
    }),
    AuthenticationModule,
    SessionsModule,
    StreamsModule,
    DevicesModule,
    StreamingModule,
    StatisticsModule,
    SettingsModule
  ],
  controllers: [
    ApplicationStateController,
    ConnectionController,
    ShutdownController
  ],
  providers: [
    ActivationService,
    ActivationStateService,
    AdminGateway,
    AdminService,
    AutoActivationService,
    ShutdownService,
    SystemMonitoringService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FallbackRoutesMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
