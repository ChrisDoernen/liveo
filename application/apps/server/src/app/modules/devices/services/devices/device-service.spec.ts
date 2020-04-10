import { ActivationEntity, DeviceEntity, DeviceType } from "@liveo/entities";
import { ActivationEntityBuilder } from "@liveo/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { BehaviorSubject } from "rxjs";
import { Logger } from "../../../core/services/logging/logger";
import { ActivationStateService } from "../../../state/services/activation-state/activation-state.service";
import { AdminService } from "../../../state/services/admin/admin.service";
import { Device } from "../../device/device";
import { DeviceDetector } from "../device-detection/device-detector";
import { LinuxDeviceDetector } from "../device-detection/linux-device-detector";
import { DeviceService } from "./device.service";

describe("DeviecService", () => {
  let deviceService: DeviceService;
  let activationStateService: jest.Mocked<ActivationStateService>;
  let deviceDetector: jest.Mocked<DeviceDetector>;
  let adminService: jest.Mocked<AdminService>;

  const activationState$ = new BehaviorSubject<ActivationEntity>(null);
  const streamCreation$ = new BehaviorSubject<boolean>(false);

  const deviceEntity = new DeviceEntity("id", "streamingId", "description", DeviceType.Audio);
  const activation = new ActivationEntityBuilder().build();

  beforeEach(() => {
    jest.useFakeTimers();

    activationStateService = createMockInstance(ActivationStateService);
    Object.defineProperty(activationStateService, "activationState$", { value: activationState$.asObservable() });
    adminService = createMockInstance(AdminService);
    Object.defineProperty(adminService, "streamCreation$", { value: streamCreation$.asObservable() });
    deviceDetector = createMockInstance(LinuxDeviceDetector);

    deviceService = new DeviceService(createMockInstance(Logger), activationStateService, adminService, deviceDetector);
  });

  afterEach(() => {
    jest.clearAllTimers();
  })

  it("should construct", () => {
    expect(deviceService).toBeTruthy();
  });

  it("should detect devices", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);

    await deviceService.initialize();
    const deviceEntities = await deviceService.getDeviceEntities()

    expect(deviceEntities).toEqual([deviceEntity]);
  });

  xit("should start streaming when admin connects", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);
    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    streamCreation$.next(true);

    jest.runAllTimers();
    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should call start streaming only once when admin connects and activation is set", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);
    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    streamCreation$.next(true);
    activationState$.next(activation);

    jest.runAllTimers();
    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should start streaming when activation is set", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);

    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    activationState$.next(activation);

    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should start streaming when admin is in stream creation and stop when leaving", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);

    const startStreamingSpy = jest.spyOn(device, "startStreaming");
    const stopStreamingSpy = jest.spyOn(device, "stopStreaming");

    await deviceService.initialize();
    streamCreation$.next(true);

    expect(startStreamingSpy).toHaveBeenCalledTimes(1);

    streamCreation$.next(false);

    expect(stopStreamingSpy).toHaveBeenCalledTimes(1);
  });
});