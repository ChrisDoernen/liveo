import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationDialogComponent } from "./activation-dialog.component";
import { MatDialog, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AngularMaterialModule } from "../../angular-material.module";
import { SessionService } from "../../services/session/session.service";
import createMockInstance from "jest-create-mock-instance";

describe("ActivationDialogComponent", () => {
  let component: ActivationDialogComponent;
  let fixture: ComponentFixture<ActivationDialogComponent>;
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);

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
        { provide: SessionService, useValue: sessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivationDialogComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
