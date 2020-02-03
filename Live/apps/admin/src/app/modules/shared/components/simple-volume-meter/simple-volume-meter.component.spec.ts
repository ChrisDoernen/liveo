import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { VolumeMeterService } from "../../services/volume-meter/volume-meter.service";
import { SimpleVolumeMeterComponent } from "./simple-volume-meter.component";

describe("SimpleVolumeMeterComponent", () => {
  let component: SimpleVolumeMeterComponent;
  let fixture: ComponentFixture<SimpleVolumeMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleVolumeMeterComponent],
      providers: [
        {
          provide: Logger,
          useValue: createMockInstance(Logger)
        },
        {
          provide: VolumeMeterService,
          useValue: createMockInstance(VolumeMeterService)
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleVolumeMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
