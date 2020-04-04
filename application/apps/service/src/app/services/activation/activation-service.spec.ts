import { ActivationEntity } from "@liveo/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { TimeService } from "../time/time.service";
import { ActivationService } from "./activation-service";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let logger: jest.Mocked<Logger>;
  let timeService: jest.Mocked<TimeService>;
  let activationStateService: jest.Mocked<ActivationStateService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    timeService = createMockInstance(TimeService);
    activationStateService = createMockInstance(ActivationStateService);

    activationService = new ActivationService(logger, timeService, activationStateService);
  });

  it("should construct", () => {
    expect(activationService).toBeDefined();
  });

  it("should throw on delete activation when no activation is set", () => {
    expect(activationService.deleteActivation).toThrow();
  });

  it("should throw on set activation with activation where end time is lower than start time", () => {
    const activation = new ActivationEntity("b8s6", "2019-08-18T12:27:13+02:00", "2019-08-18T12:26:13+02:00");

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where session id is null", () => {
    const activation = new ActivationEntity(null);

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where shutdown time is lower than end time", () => {
    const activation = new ActivationEntity("b8s6", "2019-08-18T12:27:13+02:00", "2019-08-18T12:29:13+02:00", "2019-08-18T12:28:13+02:00");

    expect(() => activationService.setActivation(activation)).toThrow();
  });
});
