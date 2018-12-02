import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { ShutdownService } from "../../../core/system/shutdown-service";
import { Logger } from "../../../core/util/logger";
import { CommandExecutor } from "../../../core/system/command-executor";

describe("ShutdownService", () => {
    const commandExecutor = createMockInstance(CommandExecutor);
    const logger = createMockInstance(Logger);
    const shutdownService = new ShutdownService(logger, commandExecutor);

    it("should construct", async () => {
        expect(shutdownService).toBeDefined();
    });

    it("should call command executor on shutdown correctly", async () => {
        shutdownService.shutdown();
        expect(commandExecutor.executeAndForget).toHaveBeenCalled();
    });
});
