import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { LogoHeaderComponent } from "./logo-header.component";

describe("LogoHeaderComponent", () => {
  let component: LogoHeaderComponent;
  let fixture: ComponentFixture<LogoHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoComponent,
        LogoHeaderComponent,
        InlineSVGDirective
      ],
      providers: [
        { provide: HttpClient, useValue: jest.fn() },
        { provide: InlineSVGService, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
