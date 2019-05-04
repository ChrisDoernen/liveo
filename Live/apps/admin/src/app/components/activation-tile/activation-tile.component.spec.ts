import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivationTileComponent } from "./activation-tile.component";
import { MatDialog, MatDialogModule, MatCardModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ActivationTileComponent", () => {
  let component: ActivationTileComponent;
  let fixture: ComponentFixture<ActivationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule
      ],
      declarations: [ActivationTileComponent],
      providers: [{ provide: MatDialog, useValue: jest.fn() }]
    }).compileComponents();
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
