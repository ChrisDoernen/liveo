import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AudioPlayerComponent } from "./audio-player.component";
import { StreamService } from "src/app/services/stream/stream.service";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";

describe("StreamComponent", () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach(() => {
    const streamService = jest.fn();
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();
    const activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({
          id: "1sfd"
        })
      }
    };

    TestBed.configureTestingModule({
      declarations: [AudioPlayerComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: StreamService, useValue: streamService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ]
    });

    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
