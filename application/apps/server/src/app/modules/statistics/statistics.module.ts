import { Module } from "@nestjs/common";
import { ConnectionHistoryService } from "./services/connection-history/connection-history-service";

@Module({
  providers: [
    ConnectionHistoryService
  ],
  exports: [
  ]
})
export class StatisticsModule { }
