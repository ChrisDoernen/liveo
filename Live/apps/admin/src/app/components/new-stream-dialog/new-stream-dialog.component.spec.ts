import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatDialog, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../angular-material.module";
import { SessionService } from "../../services/session/session.service";
import { NewStreamDialogComponent } from "./new-stream-dialog.component";

describe("NewStreamDialogComponent", () => {
  let component: NewStreamDialogComponent;
  let fixture: ComponentFixture<NewStreamDialogComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatStepperModule
      ],
      declarations: [NewStreamDialogComponent],
      providers: [
        { provide: MatDialog, useValue: jest.fn() },
        { provide: SessionService, useValue: sessionService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewStreamDialogComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
