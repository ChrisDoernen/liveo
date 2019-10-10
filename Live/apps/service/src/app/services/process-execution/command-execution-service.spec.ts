import "reflect-metadata";
import { ProcessExecutionService } from "./process-execution-service";

describe("ProcessExecutionService", () => {
  let processExecutionService;

  beforeEach(() => {
    processExecutionService = new ProcessExecutionService();
  });

  it("should execute echo correctly", done => {
    processExecutionService.execute("echo test", (error, stdout, stderr) => {
      expect(stdout).toMatch("test");
      done();
    });
  });
});
