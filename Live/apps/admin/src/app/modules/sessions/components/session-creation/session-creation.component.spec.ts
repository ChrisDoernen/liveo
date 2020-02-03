import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { TitleBarComponent } from "../../../shared/components/title-bar/title-bar.component";
import { SessionService } from "../../../shared/services/session/session.service";
import { SessionCreationComponent } from "./session-creation.component";

describe("SessionCreationComponent", () => {
  let component: SessionCreationComponent;
  let fixture: ComponentFixture<SessionCreationComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularMaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [
        SessionCreationComponent,
        TitleBarComponent
      ],
      providers: [
        { provide: MatDialog, useValue: jest.fn() },
        { provide: SessionService, useValue: sessionService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() },
        { provide: ActivatedRoute, useValue: createMockInstance(ActivatedRoute) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionCreationComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
