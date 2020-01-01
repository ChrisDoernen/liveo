import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { LogoMockModule } from "../../../../test-utilities/mocks/logo-mock.module";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ShutdownComponent } from "../../../header/components/shutdown/shutdown.component";
import { OfflineMessageComponent } from "../offline-message/offline-message.component";
import { NavigationComponent } from "./navigation.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        LogoMockModule
      ],
      declarations: [
        NavigationComponent,
        ShutdownComponent,
        OfflineMessageComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
