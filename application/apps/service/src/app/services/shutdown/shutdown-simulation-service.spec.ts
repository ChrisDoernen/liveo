import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Subject } from "rxjs";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { ActivationStateService } from "../application-state/activation-state.service";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { ShutdownSimulationService } from "./shutdown-simulation-service";

describe("ShutdownSimulationService", () => {
  let logger;
  let shutdownSimulationService;
  let activationStateService: jest.Mocked<ActivationStateService>;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    activationStateService = createMockInstance(ActivationStateService);
    Object.defineProperty(activationStateService, "activationState$", { value: new Subject() });

    shutdownSimulationService = new ShutdownSimulationService(logger, activationStateService);
  });

  it("should construct", async () => {
    expect(shutdownSimulationService).toBeDefined();
  });

  it("should only call logger", async () => {
    shutdownSimulationService.shutdown();
    expect(processExecutionService.execute).toHaveBeenCalledTimes(0);
  });
});
