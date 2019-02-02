import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../lib/logging/logger";
import { SessionService } from "../../../lib/sessions/session-service";
import { Scheduler } from "../../../lib/scheduling/scheduler";
import { ActivationService } from "../../../lib/activation/activation-service";
import { LinuxShutdownService } from "../../../lib/shutdown/linux-shutdown-service";
import { Activation } from "../../../lib/activation/activation";
import { Session } from "../../../lib/sessions/session";

describe("ActivationService", () => {

  let activationService: ActivationService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let scheduler: jest.Mocked<Scheduler>;
  let linuxShutdownService: jest.Mocked<LinuxShutdownService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    scheduler = createMockInstance(Scheduler);
    linuxShutdownService = createMockInstance(LinuxShutdownService);

    activationService = new ActivationService(logger, sessionService, scheduler, linuxShutdownService);
  });

  it("should construct", () => {
    expect(activationService).toBeDefined();
  });

  it("should throw on delete activation when no activation is set", () => {
    expect(activationService.deleteActivation).toThrow();
  });

  it("should set and delete activation right when only session id is given", () => {
    const session = createMockInstance(Session);
    sessionService.getSession.mockReturnValue(session);
    const activation = new Activation("b8s6");

    activationService.setActivation(activation);
    expect(sessionService.getSession).toHaveBeenCalledWith("b8s6");
    expect(session.start).toHaveBeenCalled();
    expect(activationService.getActivation()).toBe(activation);

    activationService.deleteActivation();
    expect(session.stop).toHaveBeenCalled();
    expect(activationService.getActivation()).toBe(null);
  });

  it("should sst and delete activation right when session id and time starting are given", () => {
    const session = createMockInstance(Session);
    sessionService.getSession.mockReturnValue(session);
    const activation = new Activation("b8s6", 1578834025100);

    activationService.setActivation(activation);
    expect(sessionService.getSession).toHaveBeenCalledWith("b8s6");
    expect(session.start).toHaveBeenCalledTimes(0);
    expect(scheduler.schedule).toHaveBeenCalledWith("SESSION_START_JOB", new Date(activation.timeStarting), session.start);
    expect(activationService.getActivation()).toBe(activation);

    activationService.deleteActivation();
    expect(scheduler.cancelJob).toBeCalledWith("SESSION_START_JOB");
    expect(activationService.getActivation()).toBe(null);
  });
});
