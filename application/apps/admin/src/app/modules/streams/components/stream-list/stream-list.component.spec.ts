import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { TitleBarComponent } from "../../../shared/components/title-bar/title-bar.component";
import { StreamListComponent } from "./stream-list.component";

describe("StreamsComponent", () => {
  let component: StreamListComponent;
  let fixture: ComponentFixture<StreamListComponent>;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularMaterialModule
      ],
      declarations: [
        StreamListComponent,
        TitleBarComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
