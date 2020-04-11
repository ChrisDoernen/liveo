import { ActivationEntity } from "@liveo/entities";
import { SettingsEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../core/services/logging/logger";
import { SettingsService } from "../../../settings/services/settings/settings-service";
import { ActivationService } from "./activation-service";
import { AutoActivationService } from "./auto-activation-service";


describe("AutoActivationService", () => {
  let autoActivationService: AutoActivationService;
  let logger: jest.Mocked<Logger>;
  let activationService: jest.Mocked<ActivationService>;
  let settingsService: jest.Mocked<SettingsService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    settingsService = createMockInstance(SettingsService);
    activationService = createMockInstance(ActivationService);

    autoActivationService = new AutoActivationService(logger, settingsService, activationService);
  });

  it("should construct", () => {
    expect(autoActivationService).toBeTruthy();
  });

  it("should not do auto activation when auto activation is disabled", () => {
    const settings = new SettingsEntityBuilder().withdefaultSession("act5pnsh").withAutoActivationEnabled(false).build();
    settingsService.getSettings.mockReturnValue(settings);

    autoActivationService.performAutoActivation();

    expect(activationService.setActivation).toHaveBeenCalledTimes(0);
  });

  it("should do auto activation when auto activation is enabled", () => {
    const defaultSession = "act5b672";
    const expectedActivation = new ActivationEntity(defaultSession);
    const settings = new SettingsEntityBuilder().withdefaultSession(defaultSession).withAutoActivationEnabled(true).build();

    settingsService.getSettings.mockReturnValue(settings);

    autoActivationService.performAutoActivation();

    expect(activationService.setActivation).toHaveBeenCalledWith(expectedActivation);
  });
});