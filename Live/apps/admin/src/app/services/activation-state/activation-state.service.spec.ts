import { TestBed } from "@angular/core/testing";
import { ActivationStateService } from "./activation-state.service";

describe("ActivationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ActivationStateService = TestBed.get(ActivationStateService);
    expect(service).toBeTruthy();
  });
});
