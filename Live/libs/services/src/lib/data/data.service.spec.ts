import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { DataService } from "./data.service";
import { SessionService } from "../session/session.service";
import { StreamService } from "../stream/stream.service";
import { ActivationService } from "../activation/activation.service";
import createMockInstance from "jest-create-mock-instance";
import { ActivationEntity } from "@live/entities";
import { SessionEntity } from "@live/entities";
import { StreamEntity } from "@live/entities";
import { StreamType } from "@live/entities";

describe("DataService", () => {
  let dataService: DataService;
  let sessionService: jest.Mocked<SessionService>;
  let streamService: jest.Mocked<StreamService>;
  let activationService: jest.Mocked<ActivationService>;

  const session = new SessionEntity("3edf", "A title", null, null, null, [
    "b76s"
  ]);
  const activation = new ActivationEntity("3edf");
  const stream = new StreamEntity(
    "b76s",
    "",
    null,
    "de",
    StreamType.Audio,
    true
  );

  beforeEach(() => {
    sessionService = createMockInstance(SessionService);
    streamService = createMockInstance(StreamService);
    activationService = createMockInstance(ActivationService);

    activationService.getActivation.mockReturnValue(
      Promise.resolve(activation)
    );
    sessionService.getSession.mockReturnValue(Promise.resolve(session));
    streamService.getStream.mockReturnValue(Promise.resolve(stream));

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionService, useValue: sessionService },
        { provide: StreamService, useValue: streamService },
        { provide: ActivationService, useValue: activationService }
      ]
    });

    dataService = TestBed.get(DataService);
  });

  it("should be created", () => {
    expect(dataService).toBeTruthy();
  });

  it("should load correctly when all promises resolve", fakeAsync(() => {
    tick();

    expect(dataService.isLoading).toBe(false);
    expect(dataService.activation).toBe(activation);
    expect(dataService.session).toBe(session);
    expect(dataService.streams.length).toBe(1);
    expect(dataService.streams[0]).toBe(stream);
  }));
});
