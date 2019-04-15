import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ShutdownSimulationService } from "./shutdown-simulation-service";
import { Scheduler } from "../scheduling/scheduler";
import { ProcessExecutionService } from "../process-execution/process-execution-service";

describe("ShutdownSimulationService", () => {
  let logger;
  let shutdownSimulationService;
  let scheduler;
  let processExecutionService;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    scheduler = createMockInstance(Scheduler);
    processExecutionService = createMockInstance(ProcessExecutionService);
    shutdownSimulationService = new ShutdownSimulationService(
      logger,
      scheduler
    );
  });

  it("should construct", async () => {
    expect(shutdownSimulationService).toBeDefined();
  });

  it("should only call logger", async () => {
    shutdownSimulationService.shutdown();
    expect(logger.info).toHaveBeenCalled();
  });
});
