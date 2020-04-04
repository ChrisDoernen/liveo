import { createMockInstance } from "jest-create-mock-instance";
import "reflect-metadata";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { Scheduler } from "./scheduler";

describe("Scheduler", () => {
  let scheduler: Scheduler;
  let logger: jest.Mocked<Logger>;
  let idGenerator: jest.Mocked<IdGenerator>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    idGenerator = createMockInstance(IdGenerator);

    scheduler = new Scheduler(logger, idGenerator);
  });

  it("should construct", async () => {
    expect(scheduler).toBeDefined();
  });
});
