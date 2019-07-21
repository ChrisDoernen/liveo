import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { LinuxDeviceDetector } from "./../devices/linux-device-detector";
import { DeviceData } from "../devices/device-data";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";

describe("LinuxDeviceDetector", () => {
  let linuxDeviceDetector: LinuxDeviceDetector;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;
  let deviceFactory;

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn(
      (deviceData: DeviceData, deviceState: DeviceState, ) => new Device(logger, deviceData, deviceState)
    );

    linuxDeviceDetector = new LinuxDeviceDetector(logger, processExecutionService, deviceFactory);
  });

  it("should construct", async () => {
    expect(linuxDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", (done) => {
    jest.spyOn(processExecutionService, "execute")
      .mockImplementation((command: string, callback: any) => callback(null, output, null));

    const promise = linuxDeviceDetector.detectDevices();

    promise.then(() => {
      const devices = linuxDeviceDetector.devices;
      expect(devices.length).toBe(2);
      expect(devices[0].id).toBe("CARD=SB,DEV=0");
      expect(devices[0].data.description).toBe("hw:CARD=SB,DEV=0");
      expect(devices[1].id).toBe("CARD=USB1,DEV=0");
      expect(devices[1].data.description).toBe("hw:CARD=USB1,DEV=0");
      done();
    }).catch(fail);
  });
});

const output =
  `dsnoop:CARD=SB,DEV=2
    HDA ATI SB, ALC892 Alt Analog
    Direct sample snooping device
hw:CARD=SB,DEV=0
    HDA ATI SB, ALC892 Analog
    Direct hardware device without any conversions
dsnoop:CARD=USB1,DEV=0
    USB Advanced Audio Device, USB Audio
    Direct sample snooping device
hw:CARD=USB1,DEV=0
    USB Advanced Audio Device, USB Audio
    Direct hardware device without any conversions
plughw:CARD=USB1,DEV=0
    USB Advanced Audio Device, USB Audio
    Hardware device with all software conversions`;