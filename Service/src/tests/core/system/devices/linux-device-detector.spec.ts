import "reflect-metadata";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../../core/util/logger";
import { CommandExecutionService } from "../../../../core/system/command-execution-service";
import { LinuxDeviceDetector } from "../../../../core/system/devices/linux-device-detector";

describe("LinuxDeviceDetector", () => {

    let linuxDeviceDetector;
    let commandExecutionService;

    beforeEach(() => {
        const logger = createMockInstance(Logger);
        commandExecutionService = createMockInstance(CommandExecutionService);
        const oneDeviceAvailableResource = `${appRoot}/src/tests/resources/system/arecordTwoAvailable.txt`;
        const commandResponse = fs.readFileSync(oneDeviceAvailableResource, "utf8");
        jest.spyOn(commandExecutionService, "executeWithResponse").mockReturnValue(commandResponse);
        linuxDeviceDetector = new LinuxDeviceDetector(logger, commandExecutionService);
    });

    it("should construct", async () => {
        expect(linuxDeviceDetector).toBeDefined();
    });

    it("should parse devices correctly when two devices are available", () => {


        expect(linuxDeviceDetector.devices.length).toBe(2);
    });
});
