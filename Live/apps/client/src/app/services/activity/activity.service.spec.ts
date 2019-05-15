import { TestBed } from "@angular/core/testing";
import { ActivityService } from "./activity.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ActivityService", () => {
  let endpointService: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });

    endpointService = TestBed.get(ActivityService);
  });

  it("should be created", () => {
    expect(endpointService).toBeTruthy();
  });
});
