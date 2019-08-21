import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import createMockInstance from "jest-create-mock-instance";
import { L3asService, EndpointService } from "@live/services";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { AboutComponent } from "../about/about.component";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Ng5SliderModule } from "ng5-slider";
import { ApplicationStateService } from "../../services/activity/application-state.service";

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
        HeaderComponent,
        InlineSVGDirective,
        AudioPlayerComponent,
        AboutComponent
      ],
      providers: [
        { provide: ApplicationStateService, useValue: applicationStateService },
        { provide: EndpointService, useValue: endpointService },
        { provide: L3asService, useValue: l3asService },
        { provide: InlineSVGService, useValue: jest.fn() }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
