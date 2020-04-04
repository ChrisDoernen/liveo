import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { AngularMaterialModule } from "../../modules/angular-material/angular-material.module";
import { LogoHeaderComponent } from "../../modules/shared/components/logo-header/logo-header.component";
import { ActivationService } from "../../services/activation/activation.service";
import { OfflineMessageComponent } from "../offline-message/offline-message.component";
import { ShutdownComponent } from "../shutdown/shutdown.component";
import { NavigationComponent } from "./navigation.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        NavigationComponent,
        ShutdownComponent,
        OfflineMessageComponent,
        MockComponent(LogoHeaderComponent)
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: ActivationService, useValue: activationService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
