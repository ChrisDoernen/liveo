import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationDialogComponent } from "./activation-dialog.component";
import { MatDialog, MatStepperModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("ActivationDialogComponent", () => {
  let component: ActivationDialogComponent;
  let fixture: ComponentFixture<ActivationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule
      ],
      declarations: [ActivationDialogComponent],
      providers: [{ provide: MatDialog, useValue: jest.fn() }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
