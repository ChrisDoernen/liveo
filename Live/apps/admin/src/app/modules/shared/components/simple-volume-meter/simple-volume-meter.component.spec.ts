import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SimpleVolumeMeterComponent } from "./simple-volume-meter.component";


describe("SimpleVolumeMeterComponent", () => {
  let component: SimpleVolumeMeterComponent;
  let fixture: ComponentFixture<SimpleVolumeMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleVolumeMeterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleVolumeMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
