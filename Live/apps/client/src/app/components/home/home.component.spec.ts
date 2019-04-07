import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import createMockInstance from "jest-create-mock-instance";
import { DataService, L3asService } from "@live/services";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import { AboutComponent } from "../about/about.component";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { HttpClient } from "@angular/common/http";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: jest.Mocked<DataService>;
  let l3asService: jest.Mocked<L3asService>;

  beforeEach(() => {
    dataService = createMockInstance(DataService);
    l3asService = createMockInstance(L3asService);

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
        { provide: L3asService, useValue: l3asService },
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
