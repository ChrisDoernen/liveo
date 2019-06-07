import { UserAgentService } from "./user-agent.service";

describe("UserAgentService", () => {
  it("should initialize correctly", () => {
    const userAgentService = new UserAgentService();
    expect(userAgentService).toBeTruthy();
  });
});