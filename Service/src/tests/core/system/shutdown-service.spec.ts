import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { ShutdownService } from "../../../core/system/shutdown-service";
import { Logger } from "../../../core/util/logger";
import { CommandExecutionService } from "../../../core/system/command-execution-service";

describe("ShutdownService", () => {

    let shutdownService;
    let commandExecutionService;

    beforeEach(() => {
        commandExecutionService = createMockInstance(CommandExecutionService);
        const logger = createMockInstance(Logger);
        shutdownService = new ShutdownService(logger, commandExecutionService);
    });

    it("should construct", async () => {
        expect(shutdownService).toBeDefined();
    });

    it("should call command executor on shutdown correctly", async () => {
        shutdownService.shutdown();
        expect(commandExecutionService.executeAndForget).toHaveBeenCalled();
    });
});
