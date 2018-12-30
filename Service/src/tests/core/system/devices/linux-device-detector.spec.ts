import "reflect-metadata";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../../core/util/logger";
import { SimpleProcessdExecutionService } from "../../../../core/system/child-processes/simple-process-execution-service";
import { LinuxDeviceDetector } from "../../../../core/system/devices/linux-device-detector";
import { DeviceData } from "../../../../core/system/devices/device-data";
import { Device } from "../../../../core/system/devices/device";

describe("LinuxDeviceDetector", () => {

    let linuxDeviceDetector;
    let commandExecutionService;
    let deviceFactory;

    beforeEach(() => {
        const logger = createMockInstance(Logger);
        commandExecutionService = createMockInstance(SimpleProcessdExecutionService);
        deviceFactory = jest.fn((deviceData: DeviceData) => new Device(logger, deviceData));

        const oneDeviceAvailableResource = `${appRoot}/src/tests/resources/system/devices/arecordTwoAvailable.txt`;
        const response = fs.readFileSync(oneDeviceAvailableResource, "utf8");
        jest.spyOn(commandExecutionService, "execute")
            .mockImplementation((command: string, callback: any) => callback(null, response, null));

        linuxDeviceDetector = new LinuxDeviceDetector(logger, commandExecutionService, deviceFactory);
    });

    it("should construct", async () => {
        expect(linuxDeviceDetector).toBeDefined();
    });

    it("should parse devices correctly when two devices are available", () => {
        const devices = linuxDeviceDetector.devices;
        expect(devices.length).toBe(2);
        expect(devices[0].id).toBe("0");
        expect(devices[0].data.description).toBe("ICH5 [Intel ICH5], device 0: Intel ICH [Intel ICH5]");
        expect(devices[1].id).toBe("1");
        expect(devices[1].data.description).toBe("U0x46d0x809 [USB Device 0x46d:0x809], device 0: USB Audio [USB Audio]");
    });
});
