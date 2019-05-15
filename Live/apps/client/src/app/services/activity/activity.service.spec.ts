import { TestBed } from "@angular/core/testing";
import { ActivityService } from "./activity.service";

describe("ActivityService", () => {
  let endpointService: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityService]
    });

    endpointService = TestBed.get(ActivityService);
  });

  it("should be created", () => {
    expect(endpointService).toBeTruthy();
  });
});
