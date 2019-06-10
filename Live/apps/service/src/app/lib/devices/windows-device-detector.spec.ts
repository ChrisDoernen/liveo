import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { DeviceData } from "../devices/device-data";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { WindowsDeviceDetector } from './windows-device-detector';

describe("WindowsDeviceDetector", () => {
  let windowsDeviceDetector: WindowsDeviceDetector;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;
  let deviceFactory: any;

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn(
      (deviceData: DeviceData, deviceState: DeviceState) => new Device(logger, deviceData, deviceState)
    );

    windowsDeviceDetector = new WindowsDeviceDetector(logger, processExecutionService, deviceFactory);
  });

  it("should construct", async () => {
    expect(windowsDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", (done) => {
    jest.spyOn(processExecutionService, "execute")
      .mockImplementation((command: string, callback: any) => callback(null, null, output));

    const promise = windowsDeviceDetector.detectDevices();

    promise.then(() => {
      const devices = windowsDeviceDetector.devices;
      expect(devices.length).toBe(3);
      expect(devices[0].data.id).toBe("USB Boot");
      expect(devices[1].data.id).toBe("Mikrofon (USB Audio Device)");
      expect(devices[2].data.id).toBe("Mikrofonarray (Realtek High Definition Audio)");
      done();
    }).catch(fail);
  });
});

const output = 
`[dshow @ 000001d80f589d80] DirectShow video devices (some may be both video and audio devices)
[dshow @ 000001d80f589d80]  "USB Boot"
[dshow @ 000001d80f589d80]     Alternative name "@device_pnp_\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global"
[dshow @ 000001d80f589d80] DirectShow audio devices
[dshow @ 000001d80f589d80]  "Mikrofon (USB Audio Device)"
[dshow @ 000001d80f589d80]     Alternative name "@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{DF784F62-32D0-42F0-A593-AD825A029783}"
[dshow @ 000001d80f589d80]  "Mikrofonarray (Realtek High Definition Audio)"
[dshow @ 000001d80f589d80]     Alternative name "@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{94EDA82A-4587-4DE4-B01A-2DEC29ADDEC8}"
dummy: Immediate exit requested`;
