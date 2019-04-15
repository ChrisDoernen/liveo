import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ShutdownComponent } from "./shutdown.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ShutdownComponent", () => {
  let component: ShutdownComponent;
  let fixture: ComponentFixture<ShutdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientTestingModule
      ],
      declarations: [ShutdownComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
