import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedSessionTileComponent } from "./activated-session-tile.component";

describe("ActivatedSessionTileComponent", () => {
  let component: ActivatedSessionTileComponent;
  let fixture: ComponentFixture<ActivatedSessionTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivatedSessionTileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivatedSessionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
