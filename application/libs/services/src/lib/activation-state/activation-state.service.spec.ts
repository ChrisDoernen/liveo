import { ActivationState } from "@liveo/entities";
import { ActivationEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { TimeService } from "../time/time.service";
import { ActivationStateService } from "./activation-state.service";

describe("ActivationStateService", () => {
  let activationStateService: ActivationStateService;
  let timeService: jest.Mocked<TimeService>;

  beforeEach(() => {
    timeService = createMockInstance(TimeService);

    activationStateService = new ActivationStateService(timeService);
  });

  it("should determine activation state correctly when session is scheduled", () => {
    const activation = new ActivationEntityBuilder().withStartTime("2019-08-18T12:30:13+02:00").build();
    timeService.now.mockReturnValue(new Date("2019-08-18T12:27:13+02:00"));

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Scheduled);
  });

  it("should determine activation state correctly when session is started", () => {
    const activation = new ActivationEntityBuilder().withStartTime("2019-08-18T12:30:13+02:00").build();
    timeService.now.mockReturnValue(new Date("2019-08-18T12:40:13+02:00"));

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Started);
  });

  it("should determine activation state correctly when session is ended", () => {
    const activation = new ActivationEntityBuilder()
      .withStartTime("2019-08-18T12:30:13+02:00")
      .withEndTime("2019-08-18T12:50:13+02:00")
      .build();
    timeService.now.mockReturnValue(new Date("2019-08-18T12:55:13+02:00"));

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Ended);
  });
});
