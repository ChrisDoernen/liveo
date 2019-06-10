import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { MacOSDeviceDetector } from "./macos-device-detector";
import { DeviceData } from "./device-data";
import { Device } from "./device";
import { DeviceState } from "./device-state";

describe("MacOSDeviceDetector", () => {
  let macOsDeviceDetector: MacOSDeviceDetector;
  let processExecutionService;
  let deviceFactory;

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn(
      (deviceData: DeviceData, deviceState: DeviceState) => new Device(logger, deviceData, deviceState)
    );

    macOsDeviceDetector = new MacOSDeviceDetector(logger, processExecutionService, deviceFactory);
  });

  it("should construct", async () => {
    expect(macOsDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", (done) => {
    jest.spyOn(processExecutionService, "execute")
      .mockImplementation((command: string, callback: any) => callback(null, null, output));

    const promise = macOsDeviceDetector.detectDevices();

    promise.then(() => {
      const devices = macOsDeviceDetector.devices;
      expect(devices.length).toBe(3);
      expect(devices[0].id).toBe("0");
      expect(devices[0].data.description).toBe("FaceTime HD Camera");
      expect(devices[1].id).toBe("1");
      expect(devices[1].data.description).toBe("Capture screen 0");
      expect(devices[2].id).toBe("0");
      expect(devices[2].data.description).toBe("Built-in Microphone");
      done();
    }).catch(fail);
  });
});

const output = 
`[AVFoundation input device @ 0x7f890974afc0] AVFoundation video devices:
[AVFoundation input device @ 0x7f890974afc0] [0] FaceTime HD Camera
[AVFoundation input device @ 0x7f890974afc0] [1] Capture screen 0
[AVFoundation input device @ 0x7f890974afc0] AVFoundation audio devices:
[AVFoundation input device @ 0x7f890974afc0] [0] Built-in Microphone
: Input/output error`;