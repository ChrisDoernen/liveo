import { ActivationEntityBuilder, SessionEntityBuilder, StreamEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { ActivationService } from "../activation/activation-service";
import { SessionService } from "../sessions/session-service";
import { StreamService } from "../streams/stream-service";
import { ActivationStateService } from "./activation-state.service";

xdescribe("ActivationStateService", () => {
  let activationStateService: ActivationStateService;
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

  });

  it("should be created", () => {
    expect(activationStateService).toBeTruthy();
  });

});
