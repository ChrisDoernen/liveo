import { ActivationEntity } from "@liveo/entities";
import { SettingsEntityBuilder } from "@liveo/test-utilities";
import { Container } from "inversify";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { SettingsService } from "../settings/settings-service";
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