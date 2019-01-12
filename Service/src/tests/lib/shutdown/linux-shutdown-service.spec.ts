import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { LinuxShutdownService } from "./../../../lib/shutdown/linux-shutdown-service";
import { Logger } from "./../../../lib/util/logger";
import { ProcessExecutionService } from "../../../lib/processes/process-execution-service";
import { Scheduler } from "../../../lib/scheduling/scheduler";

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
});
