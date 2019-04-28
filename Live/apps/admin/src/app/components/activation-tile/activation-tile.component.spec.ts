import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationTileComponent } from "./activation-tile.component";
import { MatDialog } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

describe("ActivationTileComponent", () => {
  let component: ActivationTileComponent;
  let fixture: ComponentFixture<ActivationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ActivationTileComponent],
      providers: [{ provide: MatDialog, useValue: jest.fn() }]
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
