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
import { TimeService } from "../time/time.service";

describe("ActivityService", () => {
  let activityService: ActivityService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;
  let activationService: jest.Mocked<ActivationService>;
  let timeService: jest.Mocked<TimeService>;

  const activation = new ActivationEntity("3edf", 11, 20);
  const session = new SessionEntity("5ksa", "A title", null, ["b76s"]);
  const stream = new StreamEntity("b76s", "", null, "de", "1", StreamType.Audio);

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamService);
    activationService = createMockInstance(ActivationService);
    timeService = createMockInstance(TimeService);

    activityService = new ActivityService(logger, timeService, activationService, sessionService, streamService);
  });

  it("should be created", () => {
    expect(activityService).toBeTruthy();
  });

  it("should load activity correctly when session is started", () => {
    activationService.getActivationEntity.mockReturnValue(activation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);
    timeService.now.mockReturnValue(12);

    const expectedActivity = new ActivityEntity(ActivationState.Started, activation, session, [stream]);

    const activity = activityService.getActivity();

    expect(activity).toEqual(expectedActivity);
  });

  it("should load activity correctly when session is scheduled", () => {
    activationService.getActivationEntity.mockReturnValue(activation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);
    timeService.now.mockReturnValue(10);

    const expectedActivity = new ActivityEntity(ActivationState.Scheduled, activation, session, [stream]);

    const activity = activityService.getActivity();

    expect(activity).toEqual(expectedActivity);
  });

  it("should load activity correctly when session is ended", () => {
    activationService.getActivationEntity.mockReturnValue(activation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);
    timeService.now.mockReturnValue(21);

    const expectedActivity = new ActivityEntity(ActivationState.Ended, activation, session, [stream]);

    const activity = activityService.getActivity();

    expect(activity).toEqual(expectedActivity);
  });
});

