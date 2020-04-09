import { SessionEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../data/data-service";
import { Logger } from "../logging/logger";
import { SessionService } from "./session-service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let logger: jest.Mocked<Logger>;
  let sessionRepository: jest.Mocked<DataService>;

  const firstSessionId = "tx331xqq";
  const secondSessionId = "6t3y5cew";

  const firstStreamId = "lc5wzbl6";
  const secondStreamId = "5vo7au6q";

  const sessions = [
    new SessionEntityBuilder().withId(firstSessionId).withStreams([firstStreamId]).build(),
    new SessionEntityBuilder().withId(secondSessionId).withStreams([secondStreamId]).build()
  ];

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionRepository = createMockInstance(DataService);

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
