import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EndpointService } from "@liveo/services";
import { NgxsModule } from "@ngxs/store";
import { ActivationStateReducer } from "apps/admin/src/app/reducers/activation-state.reducer";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { ActivationService } from "../../../../services/activation/activation.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { SharedModule } from "../../../shared/shared.module";
import { ActivatedSessionTileComponent } from "../activated-session-tile/activated-session-tile.component";
import { ActivationStateTileComponent } from "../activation-state-tile/activation-state-tile.component";
import { DashboardActivationComponent } from "../dashboard-activation/dashboard-activation.component";
import { DashboardNoActivationComponent } from "../dashboard-no-activation/dashboard-no-activation.component";
import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        SharedModule,
        NgxsModule.forRoot([ActivationStateReducer])
      ],
      declarations: [
        DashboardComponent,
        ActivatedSessionTileComponent,
        ActivationStateTileComponent,
        MockComponent(DashboardActivationComponent),
        MockComponent(DashboardNoActivationComponent)
      ],
      providers: [
        {
          provide: ActivationService,
          useValue: activationService
        },
        {
          provide: EndpointService,
          useValue: jest.fn()
        }
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
