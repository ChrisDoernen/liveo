import "reflect-metadata";
import { Logger } from "./logger";

describe("Logger", () => {
  const logger = new Logger({});

  it("should construct", () => {
    expect(logger).toBeDefined();
  });
});
