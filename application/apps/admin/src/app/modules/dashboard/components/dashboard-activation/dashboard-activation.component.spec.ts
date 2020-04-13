import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { Subject } from "rxjs";
import { ActivationService } from "../../../../services/activation/activation.service";
import { SessionService } from "../../../../services/session/session.service";
import { StreamService } from "../../../../services/stream/stream.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { SharedModule } from "../../../shared/shared.module";
import { ActivatedSessionTileComponent } from "../activated-session-tile/activated-session-tile.component";
import { ActivationStateTileComponent } from "../activation-state-tile/activation-state-tile.component";
import { DashboardStreamsComponent } from "../dashboard-streams/dashboard-streams.component";
import { ListeningClientsComponent } from "../listening-clients/listening-clients.component";
import { DashboardActivationComponent } from "./dashboard-activation.component";

describe("DashboardActivationComponent", () => {
  let component: DashboardActivationComponent;
  let fixture: ComponentFixture<DashboardActivationComponent>;
  let activationService: jest.Mocked<ActivationService>;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);
    Object.defineProperty(activationService, "activationState$", { value: new Subject() });
    Object.defineProperty(activationService, "activation$", { value: new Subject() });
    sessionService = createMockInstance(SessionService);
    Object.defineProperty(sessionService, "activatedSession$", { value: new Subject() });
    streamService = createMockInstance(StreamService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        SharedModule
      ],
      declarations: [
        DashboardActivationComponent,
        ActivatedSessionTileComponent,
        ActivationStateTileComponent,
        DashboardStreamsComponent,
        MockComponent(ListeningClientsComponent)
      ],
      providers: [
        { provide: ActivationService, useValue: activationService },
        { provide: SessionService, useValue: sessionService },
        { provide: StreamService, useValue: streamService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardActivationComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
