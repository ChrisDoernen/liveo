import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { ConnectionHistoryService } from "./services/connection-history/connection-history-service";

@Module({
  imports: [
    SharedModule
  ],
  providers: [
    ConnectionHistoryService
  ]
})
export class StatisticsModule { }
