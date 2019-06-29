import { TestBed } from "@angular/core/testing";
import { SystemMonitoringService } from "./system-monitoring.service";

describe("SystemMonitoringService", () => {
  let systemMonitoringService: SystemMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    systemMonitoringService = TestBed.get(SystemMonitoringService);
  });

  it("should be created", () => {
    expect(systemMonitoringService).toBeTruthy();
  });
});
