import { ComponentFixture, TestBed } from "@angular/core/testing";
import createMockInstance from "jest-create-mock-instance";
import { SessionsClient } from "../../../../services/session/session.client";
import { ActivatedSessionTileComponent } from "./activated-session-tile.component";

describe("ActivatedSessionTileComponent", () => {
  let component: ActivatedSessionTileComponent;
  let fixture: ComponentFixture<ActivatedSessionTileComponent>;
  let sessionService: jest.Mocked<SessionsClient>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionsClient);

    TestBed.configureTestingModule({
      declarations: [ActivatedSessionTileComponent],
      providers: [
        { provide: SessionsClient, useValue: sessionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivatedSessionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
