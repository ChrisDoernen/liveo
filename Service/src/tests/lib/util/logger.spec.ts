import "reflect-metadata";
import { Logger } from "../../../lib/util/logger";

describe("Logger", () => {

    const logger = new Logger();

    it("should construct", () => {
        expect(logger).toBeDefined();
    });
});
