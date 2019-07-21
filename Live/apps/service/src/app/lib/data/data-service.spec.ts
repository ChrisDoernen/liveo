import "reflect-metadata";
import { DataService } from "./data-service";
import { Logger } from "../logging/logger";
import createMockInstance from "jest-create-mock-instance";

describe("DataService", () => {
  let dataService: DataService;
  let logger;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    dataService = new DataService(logger);
  });

  it("should construct", () => {
    expect(dataService).toBeTruthy();
  })
});
