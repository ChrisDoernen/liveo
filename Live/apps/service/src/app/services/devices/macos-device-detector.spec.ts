import { DeviceEntity } from "@live/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { AudioSystem } from "../audio-system/audio-system";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Device } from "./device";
import { DeviceState } from "./device-state";
import { MacOSDeviceDetector } from "./macos-device-detector";

describe("MacOSDeviceDetector", () => {
  let macOsDeviceDetector: MacOSDeviceDetector;
  let processExecutionService;
  const audioSystem: AudioSystem = { audioSystem: "avfoundation", devicePrefix: ":" };
  let deviceFactory: any;
  const ffmpegPath = "ffmpeg";

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn((deviceData: DeviceEntity, deviceState: DeviceState) => new Device(logger, deviceData, deviceState));

    macOsDeviceDetector = new MacOSDeviceDetector(logger, audioSystem, ffmpegPath, processExecutionService, deviceFactory);
  });

  it("should construct", async () => {
    expect(macOsDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", async () => {
    jest.spyOn(processExecutionService, "execute")
      .mockImplementation((command: string, callback: any) => callback(null, null, output));
    const expectedCommand = `${ffmpegPath} -f ${audioSystem.audioSystem} -list_devices true -i '' -hide_banner`;

    await macOsDeviceDetector.runDetection();

    const devices = macOsDeviceDetector.devices;
    expect(devices.length).toBe(3);
    expect(devices[0].id).toBe("0");
    expect(devices[0].entity.description).toBe("FaceTime HD Camera");
    expect(devices[1].id).toBe("1");
    expect(devices[1].entity.description).toBe("Capture screen 0");
    expect(devices[2].id).toBe("0");
    expect(devices[2].entity.description).toBe("Built-in Microphone");
  });
});

const output =
  `[AVFoundation input device @ 0x7f890974afc0] AVFoundation video devices:
[AVFoundation input device @ 0x7f890974afc0] [0] FaceTime HD Camera
[AVFoundation input device @ 0x7f890974afc0] [1] Capture screen 0
[AVFoundation input device @ 0x7f890974afc0] AVFoundation audio devices:
[AVFoundation input device @ 0x7f890974afc0] [0] Built-in Microphone
: Input/output error`;