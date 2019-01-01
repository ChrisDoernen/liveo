import "reflect-metadata";
import { DataService } from "../../../lib/data/data-service";
import { config } from "../../../config/service.config";
import { SessionData } from "../../../lib/sessions/session-data";
import { Logger } from "../../../lib/util/logger";
import createMockInstance from "jest-create-mock-instance";
import * as appRoot from "app-root-path";

describe("DataService", () => {

    let dataService;
    let logger;

    beforeEach(() => {
        logger = createMockInstance(Logger);
        dataService = new DataService(logger);
    });

    it("should load sessions correctly when json is valid", () => {
        config.sessions = `${appRoot}/src/tests/resources/data/valid-sessions.json`;
        const sessions = dataService.loadSessions();

        const expectedSessionOne = new SessionData("bd34", "Service", ["0ag8"]);
        const expectedSessionTwo = new SessionData("a4re", "Workshop", ["15dd"]);

        expect(sessions[0]).toEqual(expectedSessionOne);
        expect(sessions[1]).toEqual(expectedSessionTwo);
    });

    it("should throw when json is invalid", () => {
        config.sessions = `${appRoot}/src/tests/resources/data/invalid-sessions.json`;
        expect(dataService.loadSessions).toThrow();
    });
});
