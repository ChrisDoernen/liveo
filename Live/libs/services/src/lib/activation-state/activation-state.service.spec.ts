import { TimeService } from "../time/time.service";
import { ActivationStateService } from "./activation-state.service";
import { ActivationEntityBuilder } from "@live/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { ActivationState } from "@live/entities";

describe("ActivationStateService", () => {
  let activationStateService: ActivationStateService;
  let timeService: jest.Mocked<TimeService>;

  beforeEach(() => {
    timeService = createMockInstance(TimeService);

    activationStateService = new ActivationStateService(timeService);
  });

  it("should determine activation state correctly when session is scheduled", () => {
    const activation = new ActivationEntityBuilder().withStartTime(5).build();
    timeService.now.mockReturnValue(4);

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Scheduled);
  });

  it("should determine activation state correctly when session is started", () => {
    const activation = new ActivationEntityBuilder().withStartTime(5).build();
    timeService.now.mockReturnValue(6);

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Started);
  });

  it("should determine activation state correctly when session is ended", () => {
    const activation = new ActivationEntityBuilder().withStartTime(4).withEndTime(5).build();
    timeService.now.mockReturnValue(6);

    const activationState = activationStateService.determineActivationState(activation);

    expect(activationState).toBe(ActivationState.Ended);
  });
});
