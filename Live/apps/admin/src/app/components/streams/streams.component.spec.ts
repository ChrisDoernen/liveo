import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StreamsComponent } from "./streams.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatCardModule, MatGridListModule } from "@angular/material";

describe("StreamsComponent", () => {
  let component: StreamsComponent;
  let fixture: ComponentFixture<StreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatGridListModule
      ],
      declarations: [StreamsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
