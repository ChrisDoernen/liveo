import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../../../core/data/data-service";
import { Logger } from "../../../core/util/logger";
import { SessionService } from "../../../core/sessions/session-service";
import { SessionEntity } from "../../../core/sessions/session-entity";

describe("SessionService", () => {

    let sessionService;
    let dataService;
    let logger;

    const sessions = [
        new SessionEntity("bcf4", "Service", ["3"]),
        new SessionEntity("43kv", "Service2", ["2"])
    ];

    beforeEach(() => {
        dataService = createMockInstance(DataService);
        logger = createMockInstance(Logger);
        dataService.loadSessions.mockReturnValue(sessions);

        sessionService = new SessionService(null, logger, dataService, null);
    });

    it("should construct", async () => {
        expect(sessionService).toBeDefined();
    });

    it("should have loaded sessions after construction", async () => {
        expect(sessionService.sessions.length).toBe(2);
        expect(dataService.loadSessions).toBeCalled();
    });
});
