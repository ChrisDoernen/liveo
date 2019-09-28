import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingsComponent } from "./settings.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [SettingsComponent],
      providers: [
        { provide: EndpointService, useValue: endpointService }
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
