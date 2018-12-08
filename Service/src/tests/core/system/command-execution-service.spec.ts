import "reflect-metadata";
import { CommandExecutionService } from "../../../core/system/command-execution-service";

describe("CommandExecutionService", () => {

    let commandExecutionService;

    beforeEach(() => {
        commandExecutionService = new CommandExecutionService();
    });

    it("should", () => {
        commandExecutionService.execute("echo test", (error, stdout, stderr) => {
            expect(stdout).toBe("test\n");
        });
    });
});
