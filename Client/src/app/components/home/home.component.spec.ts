import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { SessionService } from "src/app/services/session/session.service";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { async as _async } from "rxjs/scheduler/async";
import { ActivationService } from "src/app/services/activation/activation.service";
import { Activation } from "src/app/entities/activation.entity";
import { Session } from "src/app/entities/session.entity";
import { StreamService } from "src/app/services/stream/stream.service";
import { Stream } from "src/app/entities/stream.entity";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamService);
    activationService = createMockInstance(ActivationService);
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: SessionService, useValue: sessionService },
        { provide: StreamService, useValue: streamService },
        { provide: ActivationService, useValue: activationService },
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

  it("should load correctly when all promises resolve", fakeAsync(() => {
    const activation = new Activation("3edf");
    activationService.getActivation.mockReturnValue(Promise.resolve(activation));

    const session = new Session("3edf", "A title", null, null, null, ["b76s"]);
    sessionService.getSession.mockReturnValue(Promise.resolve(session));

    const stream = new Stream("b76s", "", null, "de");
    streamService.getStream.mockReturnValue(Promise.resolve(stream));

    expect(component.isLoading).toBe(true);

    component.ngOnInit();
    tick();

    expect(component.isLoading).toBe(false);
    expect(component.activation).toBe(activation);
    expect(component.session).toBe(session);
    expect(component.streams.length).toBe(1);
    expect(component.streams[0]).toBe(stream);
  }));
});
