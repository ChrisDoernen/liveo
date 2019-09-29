import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardActivationComponent } from "./dashboard-activation.component";
import { AngularMaterialModule } from "../../angular-material.module";
import createMockInstance from "jest-create-mock-instance";
import { ActivationService } from "../../services/activation/activation.service";
import { ActivatedSessionTileComponent } from "../activated-session-tile/activated-session-tile.component";
import { ActivationStateTileComponent } from "../activation-state-tile/activation-state-tile.component";
import { SessionService } from "../../services/session/session.service";
import { Logger } from "@live/services";

describe("DashboardActivationComponent", () => {
  let component: DashboardActivationComponent;
  let fixture: ComponentFixture<DashboardActivationComponent>;
  let activationService: jest.Mocked<ActivationService>;
  let sessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);
    sessionService = createMockInstance(SessionService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [
        DashboardActivationComponent,
        ActivatedSessionTileComponent,
        ActivationStateTileComponent
      ],
      providers: [
        { provide: ActivationService, useValue: activationService },
        { provide: SessionService, useValue: sessionService },
        { provide: Logger, useValue: jest.fn() }
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
