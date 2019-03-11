import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { async as _async } from "rxjs/scheduler/async";
import { DataService } from "src/app/services/data/data.service";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { AboutComponent } from "../about/about.component";
import { UserAgentService } from "src/app/services/user-agent/user-agent.service";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: jest.Mocked<DataService>;
  let userAgentService: jest.Mocked<UserAgentService>;

  beforeEach(() => {
    const inlineSVGService = jest.fn();
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
        { provide: UserAgentService, useValue: userAgentService },
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
});
