import { ComponentFixture, TestBed } from "@angular/core/testing";
import createMockInstance from "jest-create-mock-instance";
import { ActivationService } from "../../../../services/activation/activation.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { DashboardNoActivationComponent } from "./dashboard-no-activation.component";

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
