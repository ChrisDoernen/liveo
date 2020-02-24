import { SessionEntityBuilder } from "@live/test-utilities";
import { Container } from "inversify";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { DataService } from "../data/data-service";
import { Logger } from "../logging/logger";
import { NotificationService } from "../notifications/notification-service";
import { StreamService } from "../streams/stream-service";
import { SessionService } from "./session-service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let logger: jest.Mocked<Logger>;
  let sessionRepository: jest.Mocked<DataService>;
  let streamService: jest.Mocked<StreamService>;
  let notificationService: jest.Mocked<NotificationService>;

  const firstSessionId = "tx331xqq";
  const secondSessionId = "6t3y5cew";

  const firstStreamId = "lc5wzbl6";
  const secondStreamId = "5vo7au6q";

  const sessions = [
    new SessionEntityBuilder().withId(firstSessionId).withStreams([firstStreamId]).build(),
    new SessionEntityBuilder().withId(secondSessionId).withStreams([secondStreamId]).build()
  ];

  beforeEach(() => {
    const container = new Container();

    logger = createMockInstance(Logger);
    sessionRepository = createMockInstance(DataService);
    streamService = createMockInstance(StreamService);
    notificationService = createMockInstance(NotificationService);

    container.bind<Logger>("Logger").toConstantValue(logger);
    container.bind<DataService>("ISessionRepository").toConstantValue(sessionRepository);
    container.bind<StreamService>("StreamService").toConstantValue(streamService);
    container.bind<SessionService>("SessionService").to(SessionService).inSingletonScope();
    container.bind<NotificationService>("NotificationService").toConstantValue(notificationService);

    sessionService = container.get<SessionService>("SessionService");

    sessionRepository.getSessionEntities.mockReturnValue(sessions);
  });

  it("should construct", () => {
    expect(sessionService).toBeDefined();
  });

  it("should return correct session on get session entity", () => {
    sessionRepository.getSessionEntity.mockReturnValue(sessions[1]);

    const sessionEntiy = sessionService.getSessionEntity(firstSessionId);
    
    expect(sessionEntiy).toBe(sessions[1]);
  });
  
  it("should validate session existence correctly when session exists", () => {
    sessionRepository.getSessionEntity.mockReturnValue(sessions[1]);

    sessionService.validateSessionExists(firstSessionId);
  });

  it("should validate session existence correctly when session does not exist", () => {
    sessionRepository.getSessionEntity.mockReturnValue(null);
    
    expect(() => sessionService.validateSessionExists("5vo7ax6q")).toThrowError();
  });
});
