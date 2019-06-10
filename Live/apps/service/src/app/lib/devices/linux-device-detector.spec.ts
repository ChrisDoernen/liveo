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
      expect(devices[0].id).toBe("0");
      expect(devices[0].data.description).toBe("ICH5 [Intel ICH5], device 0: Intel ICH [Intel ICH5]");
      expect(devices[1].id).toBe("1");
      expect(devices[1].data.description).toBe("U0x46d0x809 [USB Device 0x46d:0x809], device 0: USB Audio [USB Audio]");
      done();
    }).catch(fail);
  });
});

const output = 
`**** List of CAPTURE Hardware Devices ****
card 0: ICH5 [Intel ICH5], device 0: Intel ICH [Intel ICH5]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: U0x46d0x809 [USB Device 0x46d:0x809], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0`;