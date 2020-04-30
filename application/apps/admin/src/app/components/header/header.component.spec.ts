import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@liveo/services";
import { NgxsModule } from "@ngxs/store";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { AngularMaterialModule } from "../../modules/angular-material/angular-material.module";
import { LogoHeaderComponent } from "../../modules/shared/components/logo-header/logo-header.component";
import { LogoComponent } from "../../modules/shared/components/logo/logo.component";
import { ActivationStateReducer } from "../../reducers/activation-state.reducer";
import { ActivationService } from "../../services/activation/activation.service";
import { ShutdownService } from "../../services/shutdown/shutdown.service";
import { ShutdownComponent } from "../shutdown/shutdown.component";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let shutdownService: jest.Mocked<ShutdownService>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    shutdownService = createMockInstance(ShutdownService);
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule,
        NgxsModule.forRoot([ActivationStateReducer])
      ],
      declarations: [
        HeaderComponent,
        LogoHeaderComponent,
        ShutdownComponent,
        MockComponent(LogoComponent)
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: jest.fn()
        },
        {
          provide: ShutdownService,
          useValue: shutdownService
        },
        {
          provide: Logger,
          useValue: jest.fn()
        },
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

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
