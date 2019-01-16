import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { SessionService } from "src/app/services/session/session.service";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { Session } from "src/app/entities/session.entity";
import { of, throwError } from "rxjs";
import { async as _async } from "rxjs/scheduler/async";
import { SessionState } from "src/app/entities/session-state";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: SessionService, useValue: sessionService },
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should behave correctly at connection error", fakeAsync(() => {
    sessionService.getSession.mockReturnValue(throwError(new Error("Error."), _async));
    expect(component.isLoading).toBe(true);
    fixture.detectChanges();
    expect(component.isLoading).toBe(true);
    expect(component.session).toBeNull();
    tick();
    fixture.detectChanges();
    expect(component.connectionError).toBe(true);
    expect(component.isLoading).toBe(false);
    expect(component.session).toBe(null);
    expect(component.sessionState).toBe(null);
  }));

  it("should load session correctly when session is retrieved", fakeAsync(() => {
    const session = new Session("6sj7", "English", "Some english stream", 1546875795, null, null, null, null);
    sessionService.getSession.mockReturnValue(of(session, _async));
    jest.spyOn(sessionService, "evaluateSessionState").mockReturnValue(SessionState.Started);
    expect(component.isLoading).toBe(true);
    fixture.detectChanges();
    expect(component.connectionError).toBe(false);
    expect(component.isLoading).toBe(true);
    expect(component.session).toBeNull();
    expect(component.session).toBeNull();
    tick();
    fixture.detectChanges();
    expect(sessionService.evaluateSessionState).toHaveBeenCalledTimes(1);
    expect(component.connectionError).toBe(false);
    expect(component.isLoading).toBe(false);
    expect(component.session).toBe(session);
    expect(component.sessionState).toBe(SessionState.Started);
  }));
});
