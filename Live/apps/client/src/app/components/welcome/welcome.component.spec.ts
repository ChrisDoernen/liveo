import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { Router } from "@angular/router";
import { L3asService, ActivityService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let activityService: jest.Mocked<ActivityService>;

  let l3asService: jest.Mocked<L3asService>;

  beforeEach(() => {
    const router = jest.fn();
    const inlineSVGService = jest.fn();
    l3asService = createMockInstance(L3asService);
    activityService = createMockInstance(ActivityService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WelcomeComponent, InlineSVGDirective],
      providers: [
        { provide: ActivityService, useValue: activityService },
        { provide: Router, useValue: router },
        { provide: L3asService, useValue: l3asService },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
