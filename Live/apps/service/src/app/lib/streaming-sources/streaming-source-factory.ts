import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { StreamingSource } from "./streaming-source";
import { DeviceDetector } from "../devices/device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { AudioSystem } from "../audio-system/audio-system";

export const StreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
    const audioSystem = context.container.get<AudioSystem>("AudioSystem");
    const device = deviceDetector.getDevice(deviceId);

    return new StreamingSource(logger, ffmpegLogger, websocketServer, audioSystem, device, streamId);
  };
