import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { ShutdownService } from "../../../../services/shutdown/shutdown.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ShutdownComponent } from "./shutdown.component";

describe("ShutdownComponent", () => {
  let component: ShutdownComponent;
  let fixture: ComponentFixture<ShutdownComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let shutdownService: jest.Mocked<ShutdownService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    shutdownService = createMockInstance(ShutdownService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientTestingModule
      ],
      declarations: [
        ShutdownComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: ShutdownService, useValue: shutdownService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
