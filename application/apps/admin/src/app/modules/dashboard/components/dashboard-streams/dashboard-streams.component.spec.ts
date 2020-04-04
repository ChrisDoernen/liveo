import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../shared/shared.module";
import { DashboardStreamsComponent } from "./dashboard-streams.component";

describe("DashboardStreamsComponent", () => {
  let component: DashboardStreamsComponent;
  let fixture: ComponentFixture<DashboardStreamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        DashboardStreamsComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
