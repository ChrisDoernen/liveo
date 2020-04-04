import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Subject } from "rxjs";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { WindowsShutdownService } from "./windows-shutdown-service";

describe("WindowsShutdownService", () => {
  let logger;
  let windowsShutdownService;
  let activationStateService: jest.Mocked<ActivationStateService>;
  let processExecutionService;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    activationStateService = createMockInstance(ActivationStateService);
    Object.defineProperty(activationStateService, "activationState$", { value: new Subject() });

    windowsShutdownService = new WindowsShutdownService(logger, processExecutionService, activationStateService);
  });

  it("should construct", () => {
    expect(windowsShutdownService).toBeDefined();
  });

  it("should call command executor on shutdown correctly", () => {
    windowsShutdownService.shutdown();
    expect(processExecutionService.execute).toHaveBeenCalledWith("shutdown \s");
  });
});
