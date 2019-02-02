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

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sessionService: jest.Mocked<SessionService>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    activationService = createMockInstance(ActivationService);
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: SessionService, useValue: sessionService },
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

  it("should behave correctly at connection error at loading session", async () => {
    activationService.getActivation.mockReturnValue(Promise.resolve(new Activation("bd34")));
    // sessionService.getSession.mockReturnValue(Promise.reject("Error."));

    expect(component.isLoading).toBe(true);

    await component.load();
    expect(component.isLoading).toBe(false);
  });
});
