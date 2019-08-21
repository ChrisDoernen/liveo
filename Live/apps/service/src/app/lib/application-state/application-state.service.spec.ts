import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { ApplicationStateEntity } from "@live/entities";
import { ApplicationStateService } from "./application-state.service";
import { SessionService } from "../sessions/session-service";
import { StreamService } from "../streams/stream-service";
import { ActivationService } from "../activation/activation-service";
import { Logger } from "../logging/logger";
import { SessionEntityBuilder, StreamEntityBuilder, ActivationEntityBuilder } from "@live/test-utilities";

describe("ApplicationStateService", () => {
  let applicationStateService: ApplicationStateService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;
  let activationService: jest.Mocked<ActivationService>;

  const activation = new ActivationEntityBuilder().withSessionId("3edf").build();
  const session = new SessionEntityBuilder().withId("5ksa").withStreams(["b76s"]).build();
  const stream = new StreamEntityBuilder().withId("b76s").build();

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamService);
    activationService = createMockInstance(ActivationService);

    applicationStateService = new ApplicationStateService(logger, activationService, sessionService, streamService);
  });

  it("should be created", () => {
    expect(applicationStateService).toBeTruthy();
  });

  it("should load application state correctly", () => {
    activationService.getActivationEntity.mockReturnValue(activation);
    sessionService.getSessionEntity.mockReturnValue(session);
    streamService.getStreamEntity.mockReturnValue(stream);

    const applicationState = applicationStateService.getApplicationState();

    const expectedApplicationState = new ApplicationStateEntity(activation, session, [stream]);
    expect(applicationState).toEqual(expectedApplicationState);
  });
});
