import { ActivationEntityBuilder, SessionEntityBuilder, StreamEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../core/services/logging/logger";
import { SessionService } from "../../../sessions/services/sessions/session.service";
import { Scheduler } from "../../../shared/services/scheduling/scheduler";
import { TimeService } from "../../../shared/services/time/time.service";
import { StreamsService } from "../../../streams/services/streams/streams.service";
import { AdminGateway } from "../../gateways/admin.gateway";
import { ActivationService } from "../activation/activation-service";
import { ActivationStateService } from "./activation-state.service";

xdescribe("ActivationStateService", () => {
  let activationStateService: ActivationStateService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamsService>;
  let activationService: jest.Mocked<ActivationService>;
  let scheduler: jest.Mocked<Scheduler>;
  let timeService: jest.Mocked<TimeService>;
  let adminGateway: jest.Mocked<AdminGateway>;

  const activation = new ActivationEntityBuilder().withSessionId("3edf").build();
  const session = new SessionEntityBuilder().withId("5ksa").withStreams(["b76s"]).build();
  const stream = new StreamEntityBuilder().withId("b76s").build();

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamsService);
    activationService = createMockInstance(ActivationService);
    scheduler = createMockInstance(Scheduler);
    timeService = createMockInstance(TimeService);
    adminGateway = createMockInstance(AdminGateway);

    activationStateService = new ActivationStateService(logger, sessionService, streamService, scheduler, timeService, adminGateway);
  });

  it("should be created", () => {
    expect(activationStateService).toBeTruthy();
  });
});
