import "reflect-metadata";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceData } from "../devices/device-data";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { WindowsDeviceDetector } from './windows-device-detector';

describe("WindowsDeviceDetector", () => {
  let windowsDeviceDetector;
  let processExecutionService;
  let deviceFactory;

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn(
      (deviceData: DeviceData, deviceState: DeviceState) =>
        new Device(logger, deviceData, deviceState)
    );

    windowsDeviceDetector = new WindowsDeviceDetector(logger, processExecutionService, deviceFactory);
  });

  it("should construct", async () => {
    expect(windowsDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly when two devices are available", (done) => {
    const twoDevicesAvailableResponse = `${appRoot}/apps/service/src/app/test-resources/system/devices/listDevicesTwoAvailable.txt`;
    const response = fs.readFileSync(twoDevicesAvailableResponse, "utf8");
    jest.spyOn(processExecutionService, "execute")
      .mockImplementation((command: string, callback: any) => callback(null, null, response));

    const promise = windowsDeviceDetector.detectDevices();

    promise.then(() => {
      const devices = windowsDeviceDetector.devices;
      expect(devices.length).toBe(2);
      expect(devices[0].data.id).toBe("Mikrofon (USB Audio Device)");
      expect(devices[1].data.id).toBe("Mikrofonarray (Realtek High Definition Audio)");
      done();
    }).catch(fail);
  });
});
