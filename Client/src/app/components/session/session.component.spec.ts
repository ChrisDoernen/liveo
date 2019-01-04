import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SessionComponent } from "./session.component";
import { SessionService } from "src/app/services/session-service/session.service";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { HttpClient } from "@angular/common/http";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";

describe("SessionComponent", () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(() => {
    const sessionService = jest.fn();
    const httpClient = jest.fn();
    const inlineSVGService = jest.fn();

    TestBed.configureTestingModule({
      declarations: [SessionComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: SessionService, useValue: sessionService },
        { provide: HttpClient, useValue: httpClient },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
