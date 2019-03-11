import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { Router } from "@angular/router";
import { UserAgentService } from "src/app/services/user-agent/user-agent.service";
import createMockInstance from "jest-create-mock-instance";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let userAgentService: jest.Mocked<UserAgentService>;

  beforeEach(() => {
    const router = jest.fn();
    const svgCacheService = jest.fn();
    userAgentService = createMockInstance(UserAgentService);

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent, InlineSVGDirective],
      providers: [
        { provide: Router, useValue: router },
        { provide: HttpClient, useValue: jest.fn() },
        { provide: UserAgentService, useValue: userAgentService },
        { provide: InlineSVGService, useValue: jest.fn() }
      ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
