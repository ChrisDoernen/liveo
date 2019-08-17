import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationStateTileComponent } from "./activation-state-tile.component";

describe("ActivationStateTileComponent", () => {
  let component: ActivationStateTileComponent;
  let fixture: ComponentFixture<ActivationStateTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationStateTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivationStateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
