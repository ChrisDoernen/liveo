import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { WindowsShutdownService } from './windows-shutdown-service';

describe("WindowsShutdownService", () => {
  let logger;
  let windowsShutdownService;
  let scheduler;
  let processExecutionService;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    scheduler = createMockInstance(Scheduler);
    processExecutionService = createMockInstance(ProcessExecutionService);
    windowsShutdownService = new WindowsShutdownService(logger, processExecutionService, scheduler);
  });

  it("should construct", () => {
    expect(windowsShutdownService).toBeDefined();
  });

  it("should call command executor on shutdown correctly", () => {
    windowsShutdownService.shutdown();
    expect(processExecutionService.execute).toHaveBeenCalledWith("shutdown \s");
  });
});
