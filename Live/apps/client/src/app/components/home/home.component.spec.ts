import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import createMockInstance from "jest-create-mock-instance";
import { DataService, UserAgentService } from "@live/services";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { AboutComponent } from "../about/about.component";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { HttpClient } from "@angular/common/http";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: jest.Mocked<DataService>;
  let userAgentService: jest.Mocked<UserAgentService>;

  beforeEach(() => {
    dataService = createMockInstance(DataService);
    userAgentService = createMockInstance(UserAgentService);

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        InlineSVGDirective,
        AudioPlayerComponent,
        AboutComponent
      ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: HttpClient, useValue: jest.fn() },
        { provide: UserAgentService, useValue: userAgentService },
        { provide: InlineSVGService, useValue: jest.fn() }
      ],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
