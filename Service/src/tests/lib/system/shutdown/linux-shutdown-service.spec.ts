import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { LinuxShutdownService } from "../../../../lib/system/shutdown/linux-shutdown-service";
import { Logger } from "../../../../lib/util/logger";
import { ProcessdExecutionService } from "../../../../lib/system/child-processes/process-execution-service";

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
