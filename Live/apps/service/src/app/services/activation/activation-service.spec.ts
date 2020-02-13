import { ActivationEntity } from "@live/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { WebsocketServer } from "../../core/websocket-server";
import { Logger } from "../logging/logger";
import { Scheduler } from "../scheduling/scheduler";
import { Session } from "../sessions/session";
import { SessionService } from "../sessions/session-service";
import { UnixShutdownService } from "../shutdown/unix-shutdown-service";
import { TimeService } from "../time/time.service";
import { ActivationService } from "./activation-service";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let logger: jest.Mocked<Logger>;
  let sessionService: jest.Mocked<SessionService>;
  let scheduler: jest.Mocked<Scheduler>;
  let timeService: jest.Mocked<TimeService>;
  let linuxShutdownService: jest.Mocked<UnixShutdownService>;
  let websocketServer: jest.Mocked<WebsocketServer>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    sessionService = createMockInstance(SessionService);
    scheduler = createMockInstance(Scheduler);
    timeService = createMockInstance(TimeService);
    linuxShutdownService = createMockInstance(UnixShutdownService);
    websocketServer = createMockInstance(WebsocketServer);

    activationService = new ActivationService(logger, sessionService, scheduler, linuxShutdownService, timeService, websocketServer);
  });

  it("should construct", () => {
    expect(activationService).toBeDefined();
  });

  it("should throw on delete activation when no activation is set", () => {
    expect(activationService.deleteActivation).toThrow();
  });

  it("should throw on set activation with activation where end time is lower than start time", () => {
    const activation = new ActivationEntity("b8s6", "2019-08-18T12:27:13+02:00", "2019-08-18T12:26:13+02:00");

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where session id is null", () => {
    const activation = new ActivationEntity(null);

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with activation where shutdown time is lower than end time", () => {
    const activation = new ActivationEntity("b8s6", "2019-08-18T12:27:13+02:00", "2019-08-18T12:29:13+02:00", "2019-08-18T12:28:13+02:00");

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should throw on set activation with session without valid streams", () => {
    const session = createMockInstance(Session);
    Object.defineProperty(session, "hasValidStreams", { get: () => false });
    sessionService.getSession.mockReturnValue(session);
    const activation = new ActivationEntity("b8s6");

    expect(() => activationService.setActivation(activation)).toThrow();
  });

  it("should set and delete activation correctly when only session id is given", () => {
    timeService.now.mockReturnValue(new Date("2019-08-18T12:27:13+02:00"));
    const session = createMockInstance(Session);
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
    const jobId = "id";
    scheduler.schedule.mockReturnValue(jobId);

    timeService.now.mockReturnValue(new Date("2019-08-18T12:26:13+02:00"));
    const session = createMockInstance(Session);
    sessionService.getSession.mockReturnValue(session);
    const activation = new ActivationEntity("b8s6", "2019-08-18T12:27:13+02:00");

    activationService.setActivation(activation);
    expect(sessionService.getSession).toHaveBeenCalledWith("b8s6");
    expect(session.start).toHaveBeenCalledTimes(0);
    // expect(scheduler.schedule).toHaveBeenCalledWith("SESSION_START_JOB", new Date("2019-08-18T12:27:13+02:00"), () => session.start());
    expect(activationService.getActivationEntity()).toBe(activation);

    activationService.deleteActivation();
    expect(scheduler.cancelJob).toBeCalledWith(jobId);
    expect(activationService.getActivationEntity()).toBe(null);
  });
});
