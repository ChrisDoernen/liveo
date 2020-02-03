// tslint:disable: no-use-before-declare
import { DeviceEntity } from "@live/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { PLATFORM_CONSTANTS } from "../platform-constants/platformConstants";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { Device } from "./device";
import { DeviceState } from "./device-state";
import { WindowsDeviceDetector } from "./windows-device-detector";

describe("WindowsDeviceDetector", () => {
  let windowsDeviceDetector: WindowsDeviceDetector;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;
  let idGenerator: jest.Mocked<IdGenerator>;
  const platformConstants = PLATFORM_CONSTANTS.win32;
  let deviceFactory: any;
  const ffmpegPath = "ffmpeg";

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    idGenerator = createMockInstance(IdGenerator);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn((deviceData: DeviceEntity, deviceState: DeviceState) => new Device(logger, jest.fn(), deviceData, deviceState));

    windowsDeviceDetector = new WindowsDeviceDetector(logger, platformConstants, ffmpegPath, processExecutionService, idGenerator, deviceFactory);
  });

  it("should construct", async () => {
    expect(windowsDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", async () => {
    jest.spyOn(processExecutionService, "execute").mockImplementation((command: string, callback: any) => callback(null, null, output));

    const devices = await windowsDeviceDetector.runDetection();

    expect(devices.length).toBe(3);
    expect(devices[0].entity.id).toBe("USB Boot");
    expect(devices[1].entity.id).toBe("Mikrofon (USB Audio Device)");
    expect(devices[2].entity.id).toBe("Mikrofonarray (Realtek High Definition Audio)");
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
