import { SessionEntityBuilder } from "@liveo/test-utilities";
import { Test } from "@nestjs/testing";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../core/services/logging/logger";
import { SessionRepository } from "./session-repository";
import { SessionService } from "./session.service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let logger: jest.Mocked<Logger>;
  let sessionRepository: jest.Mocked<SessionRepository>;

  const firstSessionId = "tx331xqq";
  const secondSessionId = "6t3y5cew";

  const firstStreamId = "lc5wzbl6";
  const secondStreamId = "5vo7au6q";

  const sessions = [
    new SessionEntityBuilder().withId(firstSessionId).withStreams([firstStreamId]).build(),
    new SessionEntityBuilder().withId(secondSessionId).withStreams([secondStreamId]).build()
  ];

  beforeEach(async () => {
    logger = createMockInstance(Logger);
    sessionRepository = createMockInstance(SessionRepository);
    sessionRepository.getSessionEntities.mockReturnValue(sessions);

    const moduleRef = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useValue: sessionRepository
        },
        {
          provide: Logger,
          useValue: logger
        }
      ]
    }).compile();

    sessionService = moduleRef.get<SessionService>(SessionService);
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
