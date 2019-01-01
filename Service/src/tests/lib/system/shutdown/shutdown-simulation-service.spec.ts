import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../../lib/util/logger";
import { ShutdownSimulationService } from "../../../../lib/system/shutdown/shutdown-simulation-service";

describe("ShutdownSimulationService", () => {

    let logger;
    let shutdownSimulationService;

    beforeEach(() => {
        logger = createMockInstance(Logger);
        shutdownSimulationService = new ShutdownSimulationService(logger);
    });

    it("should construct", async () => {
        expect(shutdownSimulationService).toBeDefined();
    });

    it("should only call logger", async () => {
        shutdownSimulationService.shutdown();
        expect(logger.info).toHaveBeenCalled();
    });
});
