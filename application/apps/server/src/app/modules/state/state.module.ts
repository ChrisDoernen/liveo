import { Module } from "@nestjs/common";
import { SessionsModule } from "../sessions/sessions.module";
import { SettingsModule } from "../settings/settings.module";
import { SharedModule } from "../shared/shared.module";
import { StreamsModule } from "../streams/streams.module";
import { ApplicationStateController } from "./controller/application-state.controller";
import { ConnectionController } from "./controller/connection.controller";
import { ShutdownController } from "./controller/shutdown.controller";
import { AdminGateway } from "./gateways/admin.gateway";
import { ActivationStateService } from "./services/activation-state/activation-state.service";
import { ActivationService } from "./services/activation/activation-service";
import { AutoActivationService } from "./services/activation/auto-activation-service";
import { AdminService } from "./services/admin/admin.service";
import { NotificationService } from "./services/notifications/notification-service";
import { ShutdownService } from "./services/shutdown/shutdown-service";
import { SystemMonitoringService } from "./services/system-monitoring/system-monitoring-service";

@Module({
  imports: [
    SharedModule,
    SessionsModule,
    StreamsModule,
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
    NotificationService,
    ShutdownService,
    SystemMonitoringService
  ],
  exports: [
    ActivationService,
    ActivationStateService,
    AdminService,
    AdminGateway
  ]
})
export class StateModule { }
