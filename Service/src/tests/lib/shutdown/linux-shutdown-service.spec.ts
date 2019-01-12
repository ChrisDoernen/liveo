import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { LinuxShutdownService } from "./../../../lib/shutdown/linux-shutdown-service";
import { Logger } from "./../../../lib/util/logger";
import { ProcessExecutionService } from "../../../lib/processes/process-execution-service";
import { Scheduler } from "../../../lib/scheduling/scheduler";
import { Shutdown } from "../../../lib/shutdown/shutdown";

describe("LinuxShutdownService", () => {

    let logger;
    let linuxShutdownService;
    let scheduler;
    let processExecutionService;

    beforeEach(() => {
        logger = createMockInstance(Logger);
        scheduler = createMockInstance(Scheduler);
        processExecutionService = createMockInstance(ProcessExecutionService);
        linuxShutdownService = new LinuxShutdownService(logger, processExecutionService, scheduler);
    });

    it("should construct", async () => {
        expect(linuxShutdownService).toBeDefined();
    });

    it("should call command executor on shutdown correctly", async () => {
        linuxShutdownService.shutdown();
        expect(processExecutionService.execute).toHaveBeenCalledWith("shutdown now");
    });

    it("should set shutdown correctly when shutdown has no shutdown time", async () => {
        const shutdown = new Shutdown(null);
        linuxShutdownService.setShutdown(shutdown);
        expect(processExecutionService.execute).toHaveBeenCalledWith("shutdown now");
    });

    it("should set shutdown correctly when shutdown has shutdown time", async () => {
        const shutdown = new Shutdown(1983201);
        linuxShutdownService.setShutdown(shutdown);
        expect(scheduler.schedule).toHaveBeenCalledWith("SHUTDOWN_JOB", new Date(shutdown.shutdownTime), expect.any(Function));
        expect(linuxShutdownService.getShutdown()).toBe(shutdown);
    });

    it("should cancel previously set shutdown correctly", async () => {
        const shutdown = new Shutdown(1983201);
        linuxShutdownService.setShutdown(shutdown);
        expect(linuxShutdownService.getShutdown()).toBe(shutdown);
        linuxShutdownService.cancelShutdown();
        expect(scheduler.cancelJob).toHaveBeenCalledWith("SHUTDOWN_JOB");
        expect(linuxShutdownService.getShutdown()).toBe(null);
    });

    it("should cancel shutdown correctly when no shutdown is set", async () => {
        expect(linuxShutdownService.getShutdown()).toBe(null);
        linuxShutdownService.cancelShutdown();
        expect(logger.warn).toHaveBeenCalled();
    });
});
