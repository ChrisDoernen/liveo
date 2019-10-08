import { Shutdown } from "@live/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Scheduler } from "../scheduling/scheduler";
import { UnixShutdownService } from "./unix-shutdown-service";

describe("UnixShutdownService", () => {
  let logger: jest.Mocked<Logger>;
  let unixShutdownService: UnixShutdownService;
  let scheduler: jest.Mocked<Scheduler>;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    scheduler = createMockInstance(Scheduler);
    processExecutionService = createMockInstance(ProcessExecutionService);

    unixShutdownService = new UnixShutdownService(logger, processExecutionService, scheduler);
  });

  it("should construct", () => {
    expect(unixShutdownService).toBeDefined();
  });

  it("should call command executor on shutdown correctly", () => {
    unixShutdownService.executeShutdown();
    expect(processExecutionService.execute).toHaveBeenCalledWith("sudo shutdown -h now");
  });

  it("should set shutdown correctly when shutdown has no shutdown time", () => {
    const shutdown = new Shutdown(null);
    unixShutdownService.setShutdown(shutdown);
    expect(processExecutionService.execute).toHaveBeenCalledWith("sudo shutdown -h now");
  });

  it("should set shutdown correctly when shutdown has shutdown time", () => {
    const shutdown = new Shutdown("2019-08-18T12:27:13+02:00");
    unixShutdownService.setShutdown(shutdown);
    expect(scheduler.schedule).toHaveBeenCalledWith("SHUTDOWN_JOB", new Date("2019-08-18T12:27:13+02:00"), expect.any(Function));
    expect(unixShutdownService.getShutdown()).toBe(shutdown);
  });

  it("should cancel previously set shutdown correctly", async () => {
    const shutdown = new Shutdown("2019-08-18T12:27:13+02:00");
    unixShutdownService.setShutdown(shutdown);
    expect(unixShutdownService.getShutdown()).toBe(shutdown);
    unixShutdownService.cancelShutdown();
    expect(scheduler.cancelJob).toHaveBeenCalledWith("SHUTDOWN_JOB");
    expect(unixShutdownService.getShutdown()).toBe(null);
  });

  it("should cancel shutdown correctly when no shutdown is set", async () => {
    expect(unixShutdownService.getShutdown()).toBe(null);
    unixShutdownService.cancelShutdown();
    expect(logger.warn).toHaveBeenCalled();
  });
});
