import "reflect-metadata";
import { Scheduler } from "../../../lib/scheduling/scheduler";
import { createMockInstance } from "jest-create-mock-instance";
import { Logger } from "../../../lib/logging/logger";

describe("Scheduler", () => {

    let scheduler;
    let logger;

    beforeEach(() => {
        logger = createMockInstance(Logger);

        scheduler = new Scheduler(logger);
    });

    it("should construct", async () => {
        expect(scheduler).toBeDefined();
    });


});
