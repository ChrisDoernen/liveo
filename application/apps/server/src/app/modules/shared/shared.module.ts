import { Module } from "@nestjs/common";
import { PlatformConstantsProvider } from "./platform-constants/platform-constants.provider";
import { IdGenerator } from "./services/id-generation/id-generator";
import { ProcessExecutionService } from "./services/process-execution/process-execution-service";
import { Scheduler } from "./services/scheduling/scheduler";
import { TimeService } from "./services/time/time.service";

@Module({
  providers: [
    IdGenerator,
    PlatformConstantsProvider,
    ProcessExecutionService,
    Scheduler,
    TimeService
  ],
  exports: [
    IdGenerator,
    PlatformConstantsProvider,
    ProcessExecutionService,
    Scheduler,
    TimeService
  ]
})
export class SharedModule { }
