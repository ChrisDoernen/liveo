import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { L3asService, Logger, UserAgentService } from "@liveo/services";
import { LoggerMock } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { Ng5SliderModule } from "ng5-slider";
import { AudioPlayerComponent } from "./audio-player.component";

describe("StreamComponent", () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;
  let l3asService;

  beforeEach(() => {
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
        Ng5SliderModule,
        HttpClientTestingModule
      ],
      declarations: [
        AudioPlayerComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: L3asService, useValue: l3asService },
        { provide: Logger, useClass: LoggerMock },
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
