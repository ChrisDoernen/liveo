import "reflect-metadata";
import { ISettingsProvider } from "./i-settings-provider";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../data/data-service";
import { Logger } from "../logging/logger";
import { SettingsService } from "./settings-service";
import { SessionService } from "../sessions/session-service";

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