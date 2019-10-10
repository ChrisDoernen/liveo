import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotficationsComponent } from "./notfications.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { Logger } from "@live/services";

describe("NotficationsComponent", () => {
  let component: NotficationsComponent;
  let fixture: ComponentFixture<NotficationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [
        NotficationsComponent
      ],
      providers: [
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotficationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
