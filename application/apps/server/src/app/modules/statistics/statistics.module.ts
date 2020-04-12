import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { StatiaticsGateway } from "./gateways/statistics.gateway";
import { ConnectionHistoryService } from "./services/connection-history/connection-history-service";

@Module({
  imports: [
    SharedModule
  ],
  providers: [
    ConnectionHistoryService,
    StatiaticsGateway
  ]
})
export class StatisticsModule { }
