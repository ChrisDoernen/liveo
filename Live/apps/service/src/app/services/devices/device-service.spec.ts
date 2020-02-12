import "reflect-metadata";
import { DeviceService } from "./device.service";
import { ActivationService } from "../activation/activation-service";
import { DeviceDetector } from "./device-detector";
import { AdminService } from "../admin/admin.service";
import createMockInstance from "jest-create-mock-instance";
import { LinuxDeviceDetector } from "./linux-device-detector";
import { BehaviorSubject } from "rxjs";
import { ActivationEntity, DeviceEntity, DeviceType } from "@live/entities";
import { Device } from "./device";
import { ActivationEntityBuilder } from '@live/test-utilities';

describe("DeviecService", () => {
  let deviceService: DeviceService;
  let activationService: jest.Mocked<ActivationService>;
  let deviceDetector: jest.Mocked<DeviceDetector>;
  let adminService: jest.Mocked<AdminService>;

  const activation$ = new BehaviorSubject<ActivationEntity>(null);
  const adminConnected$ = new BehaviorSubject<boolean>(false);

  const deviceEntity = new DeviceEntity("id", "streamingId", "description", DeviceType.Audio);
  const activation = new ActivationEntityBuilder().build();

  beforeEach(() => {
    jest.useFakeTimers();

    activationService = createMockInstance(ActivationService);
    Object.defineProperty(activationService, "activation$", { value: activation$.asObservable() });
    adminService = createMockInstance(AdminService);
    Object.defineProperty(adminService, "adminConnected$", { value: adminConnected$.asObservable() });
    deviceDetector = createMockInstance(LinuxDeviceDetector);

    deviceService = new DeviceService(activationService, adminService, deviceDetector);
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

  it("should start streaming when admin connects", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);
    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    adminConnected$.next(true);

    jest.runAllTimers();
    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should call start streaming only once when admin connects and activation is set", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);
    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    adminConnected$.next(true);
    activation$.next(activation);

    jest.runAllTimers();
    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should start streaming when activation is set", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);

    const startStreamingSpy = jest.spyOn(device, "startStreaming");

    await deviceService.initialize();
    activation$.next(activation);

    expect(startStreamingSpy).toHaveBeenCalledTimes(1);
  });

  xit("should start streaming when admin connects and stop when disconnecting", async () => {
    const device = createMockInstance(Device);
    Object.defineProperty(device, "entity", { get: () => deviceEntity });
    deviceDetector.runDetection.mockResolvedValue([device]);

    const startStreamingSpy = jest.spyOn(device, "startStreaming");
    const stopStreamingSpy = jest.spyOn(device, "stopStreaming");

    await deviceService.initialize();
    adminConnected$.next(true);

    expect(startStreamingSpy).toHaveBeenCalledTimes(1);

    adminConnected$.next(false);

    expect(stopStreamingSpy).toHaveBeenCalledTimes(1);
  });
});