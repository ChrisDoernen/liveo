import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import createMockInstance from "jest-create-mock-instance";
import { ActivityService, L3asService, EndpointService } from "@live/services";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { AboutComponent } from "../about/about.component";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Ng5SliderModule } from "ng5-slider";
import { HttpClient } from "@angular/common/http";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activityService: jest.Mocked<ActivityService>;
  let endpointService: jest.Mocked<EndpointService>;
  let l3asService: jest.Mocked<L3asService>;

  beforeEach(() => {
    activityService = createMockInstance(ActivityService);
    endpointService = createMockInstance(EndpointService);
    l3asService = createMockInstance(L3asService);

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
        { provide: ActivityService, useValue: activityService },
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
