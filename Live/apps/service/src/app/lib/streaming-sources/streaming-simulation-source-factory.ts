import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { IDeviceDetector } from "../devices/i-device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "../streams/stream";
import { StreamingSimulationSource } from "./streaming-simulation-source";

export const StreamingSimulationSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, stream: Stream) => {
    const logger = context.container.get<Logger>("Logger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<IDeviceDetector>("IDeviceDetector");
    const device = deviceDetector.getDevice(deviceId);

    return new StreamingSimulationSource(logger, websocketServer, device, stream);
  };
