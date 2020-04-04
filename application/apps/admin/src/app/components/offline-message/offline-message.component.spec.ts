import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { LogoHeaderComponent } from "../../modules/shared/components/logo-header/logo-header.component";
import { ConnectionStateService } from "../../services/connection-state/connection-state-service";
import { ActivatedRouteBuilder } from "../../test-utilities/test-data-builder/activated-route-builder";
import { OfflineMessageComponent } from "./offline-message.component";

describe("OfflineComponent", () => {
  let component: OfflineMessageComponent;
  let fixture: ComponentFixture<OfflineMessageComponent>;
  let activatedRoute: ActivatedRoute;
  let connectionStateService: jest.Mocked<ConnectionStateService>;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteBuilder().build();
    connectionStateService = createMockInstance(ConnectionStateService);

    TestBed.configureTestingModule({
      declarations: [
        MockComponent(LogoHeaderComponent),
        OfflineMessageComponent
      ],
      providers: [
        { provide: Logger, useValue: jest.fn() },
        { provide: ConnectionStateService, useValue: connectionStateService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineMessageComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
