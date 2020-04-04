import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logger } from "@liveo/services";
import { AngularMaterialModule } from "../../modules/angular-material/angular-material.module";
import { NotficationsComponent } from "./notfications.component";

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
