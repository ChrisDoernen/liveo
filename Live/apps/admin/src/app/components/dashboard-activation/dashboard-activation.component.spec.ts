import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardActivationComponent } from "./dashboard-activation.component";
import { AngularMaterialModule } from "../../angular-material.module";
import createMockInstance from "jest-create-mock-instance";
import { ActivationService } from "../../services/activation/activation.service";

describe("DashboardActivationComponent", () => {
  let component: DashboardActivationComponent;
  let fixture: ComponentFixture<DashboardActivationComponent>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [
        DashboardActivationComponent
      ],
      providers: [
        { provide: ActivationService, useValue: activationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
