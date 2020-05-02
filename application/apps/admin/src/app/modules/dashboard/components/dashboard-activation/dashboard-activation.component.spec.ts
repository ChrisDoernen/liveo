import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { Subject } from "rxjs";
import { ActivationService } from "../../../../services/activation/activation.service";
import { SessionsClient } from "../../../../services/session/session.client";
import { StreamsClient } from "../../../../services/stream/streams.client";
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
  let sessionService: jest.Mocked<SessionsClient>;
  let streamService: jest.Mocked<StreamsClient>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);
    Object.defineProperty(activationService, "activationState$", { value: new Subject() });
    Object.defineProperty(activationService, "activation$", { value: new Subject() });
    sessionService = createMockInstance(SessionsClient);
    Object.defineProperty(sessionService, "activatedSession$", { value: new Subject() });
    streamService = createMockInstance(StreamsClient);

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
        { provide: SessionsClient, useValue: sessionService },
        { provide: StreamsClient, useValue: streamService },
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
