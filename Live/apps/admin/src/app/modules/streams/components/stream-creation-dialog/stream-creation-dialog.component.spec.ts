import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { SessionService } from "../../../../services/session/session.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { StreamCreationDialogComponent } from "./stream-creation-dialog.component";

describe("StreamCreationDialogComponent", () => {
  let component: StreamCreationDialogComponent;
  let fixture: ComponentFixture<StreamCreationDialogComponent>;
  let endpointService: jest.Mocked<EndpointService>;
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        AngularMaterialModule
      ],
      declarations: [StreamCreationDialogComponent],
      providers: [
        { provide: MatDialog, useValue: jest.fn() },
        { provide: SessionService, useValue: sessionService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamCreationDialogComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
