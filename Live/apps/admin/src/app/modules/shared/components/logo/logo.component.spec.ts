import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGDirective } from "ng-inline-svg";
import { MockDirective } from "ng-mocks";
import { LogoComponent } from "./logo.component";

describe("LogoComponent", () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    const httpClient = jest.fn();

    TestBed.configureTestingModule({
      declarations: [
        LogoComponent,
        MockDirective(InlineSVGDirective)
      ],
      providers: [
        { provide: HttpClient, useValue: httpClient }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
