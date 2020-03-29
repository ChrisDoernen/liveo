import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import createMockInstance from "jest-create-mock-instance";
import { InlineSVGDirective } from "ng-inline-svg";
import { MockDirective } from "ng-mocks";
import { WelcomeComponent } from "./welcome.component";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    const router = createMockInstance(Router);

    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent,
        MockDirective(InlineSVGDirective)
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
