import { TestBed } from "@angular/core/testing";
import { ApplicationStateService } from "./application-state.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ApplicationStateService", () => {
  let applicationStateService: ApplicationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApplicationStateService]
    });

    applicationStateService = TestBed.get(ApplicationStateService);
  });

  it("should be created", () => {
    expect(applicationStateService).toBeTruthy();
  });
});
