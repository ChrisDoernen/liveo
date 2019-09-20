import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AngularMaterialModule } from "./angular-material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { LogoComponent } from "./components/logo/logo.component";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";

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
        LogoComponent,
        InlineSVGDirective,
        NotficationsComponent,
        OfflineMessageComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: InlineSVGService, useValue: jest.fn() }
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
