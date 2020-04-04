import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { LogoHeaderComponent } from "./modules/shared/components/logo-header/logo-header.component";
import { LogoComponent } from "./modules/shared/components/logo/logo.component";

describe("AppComponent", () => {
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavigationComponent,
        ShutdownComponent,
        MockComponent(LogoComponent),
        NotficationsComponent,
        OfflineMessageComponent,
        LogoHeaderComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
