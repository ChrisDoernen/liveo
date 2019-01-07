import { TestBed } from "@angular/core/testing";
import { SessionService } from "./session.service";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { Session } from "src/app/entities/session.entity";
import { SessionState } from "src/app/entities/session-state";

describe("SessionService", () => {
  let sessionService: SessionService;
  let httpClient = jest.fn();
  let endpointService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    sessionService = TestBed.get(SessionService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(sessionService).toBeTruthy();
  });

  it("should evaluate session state correctly from started session", async () => {
    const session = new Session("6sj7", "English", "Some stream", 1546875795, null, null, null, null);
    const sessionState = sessionService.evaluateSessionState(session);
    expect(sessionState).toBe(SessionState.Started);
  });

  it("should evaluate session state correctly from scheduled session", async () => {
    const session = new Session("6sj7", "English", "Some stream", null, null, 9999999999999999, null, null);
    const sessionState = sessionService.evaluateSessionState(session);
    expect(sessionState).toBe(SessionState.Scheduled);
  });

  it("should evaluate session state correctly from ended session", async () => {
    const session = new Session("6sj7", "English", "Some stream", 1546875790, 1546875795, null, null, null);
    const sessionState = sessionService.evaluateSessionState(session);
    expect(sessionState).toBe(SessionState.Ended);
  });
});
