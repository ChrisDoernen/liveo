import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StreamsComponent } from "./streams.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatCardModule, MatGridListModule } from "@angular/material";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";

describe("StreamsComponent", () => {
  let component: StreamsComponent;
  let fixture: ComponentFixture<StreamsComponent>;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatGridListModule
      ],
      declarations: [
        StreamsComponent
      ],
      providers: [
        { provide: EndpointService, useValue: endpointService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
