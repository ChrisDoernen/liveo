import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { AngularMaterialModule } from "../../../../modules/angular-material/angular-material.module";
import { SharedModule } from "../../../../modules/shared/shared.module";
import { SessionsClient } from "../../../../services/session/session.client";
import { StreamCreationComponent } from "./stream-creation.component";

describe("StreamCreationComponent", () => {
  let component: StreamCreationComponent;
  let fixture: ComponentFixture<StreamCreationComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: SessionsClient;

  beforeEach(() => {
    sessionService = createMockInstance(SessionsClient);
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularMaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        AngularMaterialModule,
        SharedModule
      ],
      declarations: [
        StreamCreationComponent
      ],
      providers: [
        { provide: MatDialog, useValue: jest.fn() },
        { provide: SessionsClient, useValue: sessionService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() },
        { provide: ActivatedRoute, useValue: createMockInstance(ActivatedRoute) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamCreationComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
