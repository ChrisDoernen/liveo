import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { ShutdownSimulationService } from "./shutdown-simulation-service";

describe("ShutdownSimulationService", () => {
  let logger;
  let shutdownSimulationService;
  let scheduler;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    scheduler = createMockInstance(Scheduler);
    processExecutionService = createMockInstance(ProcessExecutionService);
    shutdownSimulationService = new ShutdownSimulationService(logger);
  });

  it("should construct", async () => {
    expect(shutdownSimulationService).toBeDefined();
  });

  it("should only call logger", async () => {
    shutdownSimulationService.shutdown();
    expect(processExecutionService.execute).toHaveBeenCalledTimes(0);
  });
});
