import { ComponentFixture, TestBed } from "@angular/core/testing";
import createMockInstance from "jest-create-mock-instance";
import { SessionClient } from "../../../../services/session/session.service";
import { ActivatedSessionTileComponent } from "./activated-session-tile.component";

describe("ActivatedSessionTileComponent", () => {
  let component: ActivatedSessionTileComponent;
  let fixture: ComponentFixture<ActivatedSessionTileComponent>;
  let sessionService: jest.Mocked<SessionClient>;

  beforeEach(() => {
    sessionService = createMockInstance(SessionClient);

    TestBed.configureTestingModule({
      declarations: [ActivatedSessionTileComponent],
      providers: [
        { provide: SessionClient, useValue: sessionService }
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
