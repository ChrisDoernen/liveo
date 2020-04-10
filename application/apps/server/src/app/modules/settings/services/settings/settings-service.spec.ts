import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../core/services/logging/logger";
import { SessionService } from "../../../sessions/services/sessions/session.service";
import { SettingsProvider } from "./settings-provider";
import { SettingsService } from "./settings-service";

describe("SettingsService", () => {
  let settingsProvider: jest.Mocked<SettingsProvider>;
  let logger: jest.Mocked<Logger>;
  let settingsService: SettingsService;
  let sessionService: SessionService;

  beforeEach(() => {
    settingsProvider = createMockInstance(SettingsProvider);
    sessionService = createMockInstance(SessionService);
    logger = createMockInstance(Logger);

    settingsService = new SettingsService(logger, settingsProvider, sessionService);
  });

  it("should construct", () => {
    expect(settingsService).toBeTruthy();
  });

});