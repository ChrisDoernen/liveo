import "reflect-metadata";
import { ProcessdExecutionService } from "../../../lib/processes/process-execution-service";

describe("CommandExecutionService", () => {

    let commandExecutionService;

    beforeEach(() => {
        commandExecutionService = new ProcessdExecutionService();
    });

    it("should", () => {
        commandExecutionService.execute("echo test", (error, stdout, stderr) => {
            expect(stdout).toBe("test\n");
        });
    });
});
