import "reflect-metadata";
import { AutoActivationService } from "./auto-activation-service";
import { ActivationService } from "./activation-service";
import { Logger } from "../logging/logger";
import { SettingsService } from "../settings/settings-service";
import { Container } from "inversify";
import createMockInstance from "jest-create-mock-instance";
import { SettingsEntity, ActivationEntity } from "@live/entities";

describe("AutoActivationService", () => {
  let autoActivationService: AutoActivationService;
  let logger: jest.Mocked<Logger>;
  let activationService: jest.Mocked<ActivationService>;
  let settingsService: jest.Mocked<SettingsService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    settingsService = createMockInstance(SettingsService);
    activationService = createMockInstance(ActivationService);

    const container = new Container();
    container.bind<Logger>("Logger").toConstantValue(logger);
    container.bind<SettingsService>("SettingsService").toConstantValue(settingsService);
    container.bind<ActivationService>("ActivationService").toConstantValue(activationService);
    container.bind<AutoActivationService>("AutoActivationService").to(AutoActivationService);

    autoActivationService = container.get<AutoActivationService>("AutoActivationService");
  });

  it("should construct", () => {
    expect(autoActivationService).toBeTruthy();
  });

  it("should not do auto activation when auto activation is disabled", () => {
    settingsService.getSettings.mockReturnValue(new SettingsEntity("act5", false));

    autoActivationService.performAutoActivation();

    expect(activationService.setActivation).toHaveBeenCalledTimes(0);
  });

  it("should do auto activation when auto activation is enabled", () => {
    const defaultSession = "act5";
    const expectedActivation = new ActivationEntity(defaultSession);
    settingsService.getSettings.mockReturnValue(new SettingsEntity(defaultSession, true));

    autoActivationService.performAutoActivation();

    expect(activationService.setActivation).toHaveBeenCalledWith(expectedActivation);
  });
});