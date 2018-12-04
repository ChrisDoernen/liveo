import "reflect-metadata";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../core/util/logger";
import { DeviceDetector } from "../../../core/system/device-detector";
import { CommandExecutionService } from "../../../core/system/command-execution-service";

describe("DeviceDetector", () => {

    let deviceDetector;
    let commandExecutionService;

    beforeEach(() => {
        const logger = createMockInstance(Logger);
        commandExecutionService = createMockInstance(CommandExecutionService);
        const oneDeviceAvailableResource = `${appRoot}/src/tests/resources/ffmpeg/listDevicesOneAvailable.txt`;
        const ffmpegResponse = fs.readFileSync(oneDeviceAvailableResource, "utf8");
        jest.spyOn(commandExecutionService, "executeWithResponse").mockReturnValue(ffmpegResponse);
        deviceDetector = new DeviceDetector(logger, commandExecutionService);
    });

    it("should construct", async () => {
        expect(deviceDetector).toBeDefined();
    });

    it("should parse devices correctly when one device is available", () => {


        expect(deviceDetector.devices.length).toBe(1);
    });
});
