import { createMockInstance } from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../logging/logger";
import { Scheduler } from "./scheduler";

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
