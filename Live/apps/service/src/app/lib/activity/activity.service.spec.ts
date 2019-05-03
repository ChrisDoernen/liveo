import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { ActivationEntity, ActivityEntity, ActivationState } from "@live/entities";
import { SessionEntity } from "@live/entities";
import { StreamEntity } from "@live/entities";
import { StreamType } from "@live/entities";
import { ActivityService } from "./activity.service";
import { SessionService } from "../sessions/session-service";
import { StreamService } from "../streams/stream-service";
import { ActivationService } from "../activation/activation-service";
import { Logger } from "../logging/logger";

describe("ActivityService", () => {
  let activityService: ActivityService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;
  let activationService: jest.Mocked<ActivationService>;

  const activation = new ActivationEntity("3edf");
  const session = new SessionEntity("5ksa", "A title", null, null, null, ["b76s"]);
  const stream = new StreamEntity("b76s", "", null, "de", StreamType.Audio, true);

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamService);
    activationService = createMockInstance(ActivationService);

    activityService = new ActivityService(logger, activationService, sessionService, streamService);
  });

  it("should be created", () => {
    expect(activityService).toBeTruthy();
  });

  it("should load activity correctly", () => {
    activationService.getActivationEntity.mockReturnValue(activation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);

    const expectedActivity =
      new ActivityEntity(ActivationState.ActivatedSessionStarted, activation, session, [stream]);

    const activity = activityService.getActivity();

    expect(activity).toEqual(expectedActivity);
  });

  it("should load activity correctly when session is scheduled", () => {
    const scheduledActivation = new ActivationEntity("3edf", 1578834025100);

    activationService.getActivationEntity.mockReturnValue(scheduledActivation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);

    const expectedActivity =
      new ActivityEntity(ActivationState.ActivatedSessionScheduled, scheduledActivation, session, [stream]);

    const activity = activityService.getActivity();

    expect(activity).toEqual(expectedActivity);
  });
});

