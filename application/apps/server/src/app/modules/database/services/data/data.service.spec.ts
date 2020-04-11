import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { AppConfig } from "../../../core/configuration/app-config";
import { Logger } from "../../../core/services/logging/logger";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { DataService } from "./data.service";

xdescribe("DataService", () => {
  let dataService: DataService;
  let logger: jest.Mocked<Logger>;
  let idGenerator: jest.Mocked<IdGenerator>;
  let appConfig: jest.Mocked<AppConfig>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    idGenerator = createMockInstance(IdGenerator);
    appConfig = createMockInstance(AppConfig);
    dataService = new DataService(appConfig, logger, idGenerator);
  });

  it("should construct", () => {
    expect(dataService).toBeTruthy();
  })
});
