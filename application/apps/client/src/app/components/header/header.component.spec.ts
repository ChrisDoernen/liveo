import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGDirective } from "ng-inline-svg";
import { MockDirective } from "ng-mocks";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const httpClient = jest.fn();

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockDirective(InlineSVGDirective)
      ],
      providers: [
        { provide: HttpClient, useValue: httpClient }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
