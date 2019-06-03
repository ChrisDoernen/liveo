import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AudioPlayerComponent } from "./audio-player.component";
import { StreamService, L3asService, UserAgentService } from "@live/services";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { Ng5SliderModule } from "ng5-slider";

describe("StreamComponent", () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;
  let l3asService;

  beforeEach(() => {
    const streamService = jest.fn();
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();
    l3asService = createMockInstance(L3asService);

    const activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({
          id: "1sfd"
        })
      }
    };

    TestBed.configureTestingModule({
      imports: [
        Ng5SliderModule
      ],
      declarations: [
        AudioPlayerComponent,
        HeaderComponent,
        InlineSVGDirective
      ],
      providers: [
        { provide: StreamService, useValue: streamService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: inlineSVGService },
        { provide: L3asService, useValue: l3asService },
        UserAgentService
      ]
    });

    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
