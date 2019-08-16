import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotficationsComponent } from "./notfications.component";

describe("NotficationsComponent", () => {
  let component: NotficationsComponent;
  let fixture: ComponentFixture<NotficationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotficationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotficationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
