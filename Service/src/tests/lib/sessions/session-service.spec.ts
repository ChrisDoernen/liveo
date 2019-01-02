import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../../../lib/data/data-service";
import { Logger } from "../../../lib/util/logger";
import { SessionService } from "../../../lib/sessions/session-service";
import { SessionData } from "../../../lib/sessions/session-data";
import { StreamService } from "../../../lib/streams/stream-service";
import { Stream } from "../../../lib/streams/stream";

describe("SessionService", () => {

    let sessionService;
    let logger;
    let dataService;
    let streamService;
    let sessionFactory;

    const sessions = [
        new SessionData("bcf4", "Service", ["vfg3"]),
        new SessionData("43kv", "Service2", ["2gus"])
    ];

    beforeEach(() => {
        logger = createMockInstance(Logger);
        dataService = createMockInstance(DataService);
        dataService.loadSessionData.mockReturnValue(sessions);
        streamService = createMockInstance(StreamService);
        sessionFactory = jest.fn();

        sessionService = new SessionService(logger, dataService, streamService, sessionFactory);
    });

    it("should construct", async () => {
        expect(sessionService).toBeDefined();
    });

    it("should have loaded sessions when load session is called", async () => {
        sessionService.loadSessions();
        expect(dataService.loadSessionData).toBeCalled();
        expect(sessionService.sessions.length).toBe(2);
    });

    it("should have called logger warn if no streams are available", async () => {
        sessionService.loadSessions();
        expect(sessionService.sessions.length).toBe(2);
        expect(logger.warn).toHaveBeenCalled();
    });

    it("should have loaded the streams of the sessions correctly when streams are available", async () => {
        const stream = createMockInstance(Stream);
        sessionService.loadSessions();
        const streams = [stream];

        // ToDo
        // jest.spyOn(streamService, "streams", "get").mockReturnValue(streams);
        // streamService.streams.mockReturnValue(null);

        expect(sessionService.sessions.length).toBe(2);
    });
});
