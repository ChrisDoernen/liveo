import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { Router } from "@angular/router";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    const router = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WelcomeComponent, InlineSVGDirective],
      providers: [
        { provide: Router, useValue: router },
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
