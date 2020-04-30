import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EndpointService, Logger } from "@liveo/services";
import { LoggerMock } from "@liveo/test-utilities";
import { SessionClient } from "apps/admin/src/app/services/session/session.service";
import { SettingsService } from "apps/admin/src/app/services/settings/settings.service";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { TitleBarComponent } from "../../../shared/components/title-bar/title-bar.component";
import { SettingsComponent } from "./settings.component";

xdescribe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: jest.Mocked<SessionClient>;
  let settingsService: jest.Mocked<SettingsService>;
  let logger: jest.Mocked<Logger>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    settingsService = createMockInstance(SettingsService);
    endpointService = createMockInstance(EndpointService);
    sessionService = createMockInstance(SessionClient);
    sessionService.getSessions.mockResolvedValue([]);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AngularMaterialModule,
        NoopAnimationsModule
      ],
      declarations: [
        SettingsComponent,
        TitleBarComponent
      ],
      providers: [
        {
          provide: EndpointService,
          useValue: endpointService
        },
        {
          provide: Logger,
          useValue: LoggerMock
        },
        {
          provide: SessionClient,
          useValue: sessionService
        },
        {
          provide: SettingsService,
          useValue: settingsService
        }
      ]
    }).compileComponents().catch(fail);

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
