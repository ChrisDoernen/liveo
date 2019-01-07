import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { SessionComponent } from "./session.component";
import { SessionService } from "src/app/services/session/session.service";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { Session } from "src/app/entities/session.entity";
import { of, Observable } from "rxjs";
import { async as _async } from "rxjs/scheduler/async";
import { SessionState } from "src/app/entities/session-state";
import "rxjs/add/observable/throw";

describe("SessionComponent", () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;
  let sessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      declarations: [SessionComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: SessionService, useValue: sessionService },
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should behave correctly at connection error", fakeAsync(() => {
    const errorObservable = Observable.create((observer) => observer.error(new Error("SomeError")));
    sessionService.getSession.mockReturnValue(of(errorObservable, _async));
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

  it("should load session correctly when a started session is retrieved", fakeAsync(() => {
    const session = new Session("6sj7", "English", "Some english stream", 1546875795, null, null, null, null);
    sessionService.getSession.mockReturnValue(of(session, _async));
    expect(component.isLoading).toBe(true);
    fixture.detectChanges();
    expect(component.connectionError).toBe(false);
    expect(component.isLoading).toBe(true);
    expect(component.session).toBeNull();
    expect(component.session).toBeNull();
    tick();
    fixture.detectChanges();
    expect(component.connectionError).toBe(false);
    expect(component.isLoading).toBe(false);
    expect(component.session).toBe(session);
    expect(component.sessionState).toBe(SessionState.Started);
  }));
});
