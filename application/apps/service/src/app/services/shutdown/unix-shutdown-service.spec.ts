import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Subject } from "rxjs";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { UnixShutdownService } from "./unix-shutdown-service";

describe("UnixShutdownService", () => {
  let logger: jest.Mocked<Logger>;
  let unixShutdownService: UnixShutdownService;
  let activationStateService: jest.Mocked<ActivationStateService>;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    activationStateService = createMockInstance(ActivationStateService);
    Object.defineProperty(activationStateService, "activationState$", { value: new Subject() });

    unixShutdownService = new UnixShutdownService(logger, processExecutionService, activationStateService);
  });

  it("should construct", () => {
    expect(unixShutdownService).toBeDefined();
  });

  it("should call command executor on shutdown correctly", () => {
    unixShutdownService.executeShutdown();
    expect(processExecutionService.execute).toHaveBeenCalledWith("sudo shutdown -h now");
  });
});
