import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { DataService } from "./data-service";

describe("DataService", () => {
  let dataService: DataService;
  let logger: jest.Mocked<Logger>;
  let idGenerator: jest.Mocked<IdGenerator>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    idGenerator = createMockInstance(IdGenerator);
    dataService = new DataService(logger, idGenerator);
  });

  it("should construct", () => {
    expect(dataService).toBeTruthy();
  })
});
