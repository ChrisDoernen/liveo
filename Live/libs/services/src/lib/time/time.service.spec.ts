import { TestBed } from "@angular/core/testing";
import { TimeService } from "./time.service";

describe("TimeServiceService", () => {
  let timeService: TimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    timeService = TestBed.get(TimeService);
  });

  it("should be created", () => {
    expect(timeService).toBeTruthy();
  });
});
