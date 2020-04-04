import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { SessionService } from "../../../../services/session/session.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ActivationDialogComponent } from "./activation-dialog.component";

describe("ActivationDialogComponent", () => {
  let component: ActivationDialogComponent;
  let fixture: ComponentFixture<ActivationDialogComponent>;
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
      declarations: [ActivationDialogComponent],
      providers: [
        { provide: MatDialog, useValue: jest.fn() },
        { provide: SessionService, useValue: sessionService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivationDialogComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
