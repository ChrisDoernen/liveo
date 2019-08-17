import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationStateTileComponent } from "./activation-state-tile.component";
import { ActivationService } from "../../services/activation/activation.service";
import createMockInstance from "jest-create-mock-instance";

describe("ActivationStateTileComponent", () => {
  let component: ActivationStateTileComponent;
  let fixture: ComponentFixture<ActivationStateTileComponent>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      declarations: [ActivationStateTileComponent],
      providers: [
        { provide: ActivationService, useValue: activationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivationStateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
