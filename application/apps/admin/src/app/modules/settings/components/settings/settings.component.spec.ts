import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EndpointService, Logger } from "@liveo/services";
import { SessionService } from "apps/admin/src/app/services/session/session.service";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { TitleBarComponent } from "../../../shared/components/title-bar/title-bar.component";
import { SettingsComponent } from "./settings.component";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: jest.Mocked<SessionService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    sessionService = createMockInstance(SessionService);
    sessionService.getSessions.mockResolvedValue([]);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        SettingsComponent,
        TitleBarComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() },
        { provide: SessionService, useValue: sessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
