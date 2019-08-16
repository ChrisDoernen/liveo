import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardNoActivationComponent } from "./dashboard-no-activation.component";
import { AngularMaterialModule } from "../../angular-material.module";
import createMockInstance from "jest-create-mock-instance";
import { ActivationService } from "../../services/activation/activation.service";

describe("DashboardNoActivationComponent", () => {
  let component: DashboardNoActivationComponent;
  let fixture: ComponentFixture<DashboardNoActivationComponent>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [
        DashboardNoActivationComponent
      ],
      providers: [
        { provide: ActivationService, useValue: activationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardNoActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
