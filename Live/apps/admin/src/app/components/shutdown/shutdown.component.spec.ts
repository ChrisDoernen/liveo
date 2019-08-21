import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ShutdownComponent } from "./shutdown.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";

describe("ShutdownComponent", () => {
  let component: ShutdownComponent;
  let fixture: ComponentFixture<ShutdownComponent>;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientTestingModule
      ],
      declarations: [
        ShutdownComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService }
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
