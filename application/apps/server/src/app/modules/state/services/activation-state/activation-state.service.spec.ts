import { ActivationEntityBuilder, SessionEntityBuilder, StreamEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { ActivationService } from "../../../../../service/src/app/services/activation/activation-service";
import { Logger } from "../../../core/services/logging/logger";
import { SessionService } from "../../../sessions/services/sessions/session.service";
import { StreamsService } from "../../../streams/services/streams/streams.service";
import { ActivationStateService } from "./activation-state.service";

xdescribe("ActivationStateService", () => {
  let activationStateService: ActivationStateService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamsService>;
  let activationService: jest.Mocked<ActivationService>;

  const activation = new ActivationEntityBuilder().withSessionId("3edf").build();
  const session = new SessionEntityBuilder().withId("5ksa").withStreams(["b76s"]).build();
  const stream = new StreamEntityBuilder().withId("b76s").build();

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamsService);
    activationService = createMockInstance(ActivationService);

  });

  it("should be created", () => {
    expect(activationStateService).toBeTruthy();
  });

});
