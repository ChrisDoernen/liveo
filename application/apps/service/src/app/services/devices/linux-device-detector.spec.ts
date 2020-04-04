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
import { LinuxDeviceDetector } from "./linux-device-detector";

describe("LinuxDeviceDetector", () => {
  let linuxDeviceDetector: LinuxDeviceDetector;
  let processExecutionService: jest.Mocked<ProcessExecutionService>;
  let idGenerator: jest.Mocked<IdGenerator>;

  let deviceFactory: any;

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    idGenerator = createMockInstance(IdGenerator);
    processExecutionService = createMockInstance(ProcessExecutionService);
    deviceFactory = jest.fn((deviceData: DeviceEntity, deviceState: DeviceState, ) => new Device(logger, jest.fn(), deviceData, deviceState));

    linuxDeviceDetector = new LinuxDeviceDetector(logger, PLATFORM_CONSTANTS.linux, processExecutionService, idGenerator, deviceFactory);
  });

  it("should construct", () => {
    expect(linuxDeviceDetector).toBeDefined();
  });

  it("should parse devices correctly", async () => {
    jest.spyOn(processExecutionService, "execute").mockImplementation((command: string, callback: any) => callback(null, output, null));

    const devices = await linuxDeviceDetector.runDetection();

    expect(devices.length).toBe(2);
    expect(devices[0].id).toBe("CARD=SB,DEV=0");
    expect(devices[0].entity.description).toBe("hw:CARD=SB,DEV=0");
    expect(devices[1].id).toBe("CARD=USB1,DEV=0");
    expect(devices[1].entity.description).toBe("hw:CARD=USB1,DEV=0");
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