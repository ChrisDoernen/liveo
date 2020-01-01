import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { LogoComponent } from "./logo.component";

describe("LogoComponent", () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    const httpClient = jest.fn();

    TestBed.configureTestingModule({
      declarations: [
        LogoComponent,
        InlineSVGDirective
      ],
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: jest.fn() }
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
