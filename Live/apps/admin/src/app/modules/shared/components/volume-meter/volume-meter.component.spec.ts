import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { VolumeMeterService } from "../../services/volume-meter/volume-meter.service";
import { VolumeMeterComponent } from "./volume-meter.component";

describe("VolumeMeterComponent", () => {
  let component: VolumeMeterComponent;
  let fixture: ComponentFixture<VolumeMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VolumeMeterComponent
      ],
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

    fixture = TestBed.createComponent(VolumeMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
