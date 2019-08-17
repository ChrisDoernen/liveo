import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { ActivationService } from "../../services/activation/activation.service";
import createMockInstance from "jest-create-mock-instance";
import { DashboardActivationComponent } from "../dashboard-activation/dashboard-activation.component";
import { DashboardNoActivationComponent } from "../dashboard-no-activation/dashboard-no-activation.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { ActivatedSessionTileComponent } from "../activated-session-tile/activated-session-tile.component";
import { ActivationStateTileComponent } from "../activation-state-tile/activation-state-tile.component";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [
        DashboardComponent,
        ActivatedSessionTileComponent,
        ActivationStateTileComponent,
        DashboardActivationComponent,
        DashboardNoActivationComponent
      ],
      providers: [
        { provide: ActivationService, useValue: activationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
