import "reflect-metadata";
import { ProcessExecutionService } from "../../../lib/processes/process-execution-service";

describe("CommandExecutionService", () => {

    let commandExecutionService;

    beforeEach(() => {
        commandExecutionService = new ProcessExecutionService();
    });

    it("should", () => {
        commandExecutionService.execute("echo test", (error, stdout, stderr) => {
            expect(stdout).toBe("test\n");
        });
    });
});
