import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { EndpointService, L3asService, Logger } from "@live/services";
import { LoggerMock } from "@live/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { InlineSVGDirective } from "ng-inline-svg";
import { MockComponent } from "ng-mocks";
import { Ng5SliderModule } from "ng5-slider";
import { ApplicationStateService } from "../../services/application-state/application-state.service";
import { AboutComponent } from "../about/about.component";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let applicationStateService: jest.Mocked<ApplicationStateService>;
  let endpointService: jest.Mocked<EndpointService>;
  let l3asService: jest.Mocked<L3asService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    l3asService = createMockInstance(L3asService);
    applicationStateService = createMockInstance(ApplicationStateService);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        Ng5SliderModule,
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent,
        MockComponent(HeaderComponent),
        InlineSVGDirective,
        AudioPlayerComponent,
        AboutComponent
      ],
      providers: [
        { provide: ApplicationStateService, useValue: applicationStateService },
        { provide: EndpointService, useValue: endpointService },
        { provide: L3asService, useValue: l3asService },
        { provide: Logger, UseClass: LoggerMock }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
