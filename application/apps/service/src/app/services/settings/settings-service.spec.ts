import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { DataService } from "../data/data-service";
import { SessionService } from "../sessions/session-service";
import { ISettingsProvider } from "./i-settings-provider";
import { SettingsService } from "./settings-service";

describe("SettingsService", () => {
  let settingsProvider: jest.Mocked<ISettingsProvider>;
  let logger: jest.Mocked<Logger>;
  let settingsService: SettingsService;
  let sessionService: SessionService;

  beforeEach(() => {
    settingsProvider = createMockInstance(DataService);
    sessionService = createMockInstance(SessionService);
    logger = createMockInstance(Logger);

    settingsService = new SettingsService(logger, settingsProvider, sessionService);
  });

  it("should construct", () => {
    expect(settingsService).toBeTruthy();
  });

});