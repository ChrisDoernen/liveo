import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivationTileComponent } from "./activation-tile.component";

describe("ActivationTileComponent", () => {
  let component: ActivationTileComponent;
  let fixture: ComponentFixture<ActivationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
