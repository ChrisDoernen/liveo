import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { LinuxShutdownService } from "../../../../core/system/shutdown/linux-shutdown-service";
import { Logger } from "../../../../core/util/logger";
import { ProcessdExecutionService } from "../../../../core/system/child-processes/process-execution-service";

describe("LinuxShutdownService", () => {

    let linuxShutdownService;
    let commandExecutionService;

    beforeEach(() => {
        commandExecutionService = createMockInstance(ProcessdExecutionService);
        const logger = createMockInstance(Logger);
        linuxShutdownService = new LinuxShutdownService(logger, commandExecutionService);
    });

    it("should construct", async () => {
        expect(linuxShutdownService).toBeDefined();
    });

    it("should call command executor on shutdown correctly", async () => {
        linuxShutdownService.shutdown();
        expect(commandExecutionService.execute).toHaveBeenCalledWith("shutdown now");
    });
});
