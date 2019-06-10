import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { SessionService } from "../sessions/session-service";
import { Scheduler } from "../scheduling/scheduler";
import { ActivationService } from "../activation/activation-service";
import { UnixShutdownService } from "../shutdown/linux-shutdown-service";
import { ActivationEntity } from "@live/entities";
import { Session } from "../sessions/session";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let scheduler: jest.Mocked<Scheduler>;
  let linuxShutdownService: jest.Mocked<UnixShutdownService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    scheduler = createMockInstance(Scheduler);
    linuxShutdownService = createMockInstance(UnixShutdownService);

    activationService = new ActivationService(logger, sessionService, scheduler, linuxShutdownService);
  });

  it("should construct", () => {
    expect(activationService).toBeDefined();
  });

  it("should throw on delete activation when no activation is set", () => {
    expect(activationService.deleteActivation).toThrow();
  });

  it("should throw on set activation with activation where end time is lower than start time", () => {
    const activation = new ActivationEntity("b8s6", 2, 1);

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where session id is null", () => {
    const activation = new ActivationEntity(null);

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where shutdown time is lower than end time", () => {
    const activation = new ActivationEntity("b8s6", 2, 4, 3);

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with session without valid streams", () => {
    const session = createMockInstance(Session);
    Object.defineProperty(session, "hasValidStreams", { get: () => false });
    sessionService.getSession.mockReturnValue(session);
    const activation = new ActivationEntity("b8s6");

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should set and delete activation right when only session id is given", () => {
    const session = createMockInstance(Session);
    Object.defineProperty(session, "hasValidStreams", { get: () => true });
    sessionService.getSession.mockReturnValue(session);
    const activation = new ActivationEntity("b8s6");

    activationService.setActivation(activation);
    expect(sessionService.getSession).toHaveBeenCalledWith("b8s6");
    expect(session.start).toHaveBeenCalled();
    expect(activationService.getActivationEntity()).toBe(activation);
    expect(activationService.getActivationEntity().startTime).toBeDefined();

    activationService.deleteActivation();
    expect(session.stop).toHaveBeenCalled();
    expect(activationService.getActivationEntity()).toBe(null);
  });

  it("should set and delete activation correctly when session id and time starting are given", () => {
    const session = createMockInstance(Session);
    // session.allStreamsAreInvalid.mockReturnValue(false);
    // jest.spyOn(session, "hasValidStreams", "get");
    Object.defineProperty(session, "hasValidStreams", { get: () => true });
    sessionService.getSession.mockReturnValue(session);
    const activation = new ActivationEntity("b8s6", 1578834025100);

    activationService.setActivation(activation);
    expect(sessionService.getSession).toHaveBeenCalledWith("b8s6");
    expect(session.start).toHaveBeenCalledTimes(0);
    // expect(scheduler.schedule).toHaveBeenCalledWith("SESSION_START_JOB", 1578834025100, () => session.start());
    expect(activationService.getActivationEntity()).toBe(activation);

    activationService.deleteActivation();
    expect(scheduler.cancelJob).toBeCalledWith("SESSION_START_JOB");
    expect(activationService.getActivationEntity()).toBe(null);
  });
});
