import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { DeviceDetector } from "../devices/device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { StreamingSimulationSource } from "./streaming-simulation-source";

export const StreamingSimulationSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string) => {
    const logger = context.container.get<Logger>("Logger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
    const device = deviceDetector.getDevice(deviceId);

    return new StreamingSimulationSource(logger, websocketServer, device, streamId);
  };
