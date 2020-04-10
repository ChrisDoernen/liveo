import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../core/services/logging/logger";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { DataService } from "./data.service";

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
