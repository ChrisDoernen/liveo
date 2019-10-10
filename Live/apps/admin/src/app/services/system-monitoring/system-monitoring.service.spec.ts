import { TestBed } from "@angular/core/testing";
import { SystemMonitoringService } from "./system-monitoring.service";
import { Logger } from "@live/services";

describe("SystemMonitoringService", () => {
  let systemMonitoringService: SystemMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Logger, useValue: jest.fn() }
      ]
    });
    systemMonitoringService = TestBed.get(SystemMonitoringService);
  });

  it("should be created", () => {
    expect(systemMonitoringService).toBeTruthy();
  });
});
