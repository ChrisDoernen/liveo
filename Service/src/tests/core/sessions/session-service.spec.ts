import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../../../core/data/data-service";
import { Logger } from "../../../core/util/logger";
import { SessionService } from "../../../core/sessions/session-service";
import { SessionData } from "../../../core/sessions/session-data";
import { StreamService } from "../../../core/streams/stream-service";
import { Stream } from "../../../core/streams/stream";

describe("SessionService", () => {

    let sessionService;
    let logger;
    let dataService;
    let streamService;
    let sessionFactory: jest.Mock<{}>;

    beforeEach(() => {
        logger = createMockInstance(Logger);
        dataService = createMockInstance(DataService);
        streamService = createMockInstance(StreamService);

        const stream = createMockInstance(Stream);

        const sessions = [
            new SessionData("bcf4", "Service", ["vfg3"]),
            new SessionData("43kv", "Service2", ["2gus"])
        ];

        dataService.loadSessions.mockReturnValue(sessions);
        sessionFactory = jest.fn();

        sessionService = new SessionService(logger, dataService, streamService, sessionFactory);
    });

    it("should construct", async () => {
        expect(sessionService).toBeDefined();
    });

    it("should have loaded sessions after construction", async () => {
        expect(dataService.loadSessions).toBeCalled();
        expect(sessionService.sessions.length).toBe(2);
    });

    it("should have called logger warn if no streams are available", async () => {
        expect(dataService.loadSessions).toBeCalled();
        expect(sessionService.sessions.length).toBe(2);
        expect(logger.warn).toHaveBeenCalled();
    });
});
