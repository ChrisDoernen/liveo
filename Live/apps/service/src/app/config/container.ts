import { LinuxShutdownService } from "../lib/shutdown/linux-shutdown-service";
import { ShutdownSimulationService } from "../lib/shutdown/shutdown-simulation-service";
import { Container, interfaces } from "inversify";
import { Logger } from "../lib/logging/logger";
import { ServiceConfig } from "./service.config";
import { ProcessExecutionService } from "../lib/process-execution/process-execution-service";
import { IDeviceDetector } from "../lib/devices/i-device-detector";
import { LinuxDeviceDetector } from "../lib/devices/linux-device-detector";
import { SimulationDeviceDetector } from "../lib/devices/simulation-device-detector";
import { DataService } from "../lib/data/data-service";
import { SessionService } from "../lib/sessions/session-service";
import { StreamService } from "../lib/streams/stream-service";
import { WebsocketServer } from "../lib/core/websocket-server";
import { Stream } from "../lib/streams/stream";
import { Session } from "../lib/sessions/session";
import { Device } from "../lib/devices/device";
import { DeviceFactory } from "../lib/devices/device-factory";
import { SessionFactory } from "../lib/sessions/session-factory";
import { StreamFactory } from "../lib/streams/stream-factory";
import { StreamingSourceFactory } from "../lib/streaming-sources/streaming-source-factory";
import { Bootstrapper } from "../lib/core/bootstrapper";
import { WebServer } from "../lib/core/web-server";
import { ActivationService } from "../lib/activation/activation-service";
import { Scheduler } from "../lib/scheduling/scheduler";
import { ShutdownService } from "../lib/shutdown/shutdown-service";
import { ServiceLogger, FfmpegLogger } from "./logging.config";
import { StreamingSimulationSourceFactory } from "../lib/streaming-sources/streaming-simulation-source-factory";
import { IStreamingSource } from "../lib/streaming-sources/i-streaming-source";

export const container = new Container();

if (!ServiceConfig.production) {
  container.bind<ShutdownService>("ShutdownService").to(ShutdownSimulationService).inSingletonScope();
} else if (ServiceConfig.os === "linux") {
  container.bind<ShutdownService>("ShutdownService").to(LinuxShutdownService).inSingletonScope();
} else {
  throw new Error("OS is unsupported.");
}

if (ServiceConfig.simulate) {
  container.bind<IDeviceDetector>("IDeviceDetector").to(SimulationDeviceDetector).inSingletonScope();
  container.bind<interfaces.Factory<IStreamingSource>>("StreamingSourceFactory").toFactory(StreamingSimulationSourceFactory);
} else {
  if (ServiceConfig.os === "linux") {
    container.bind<IDeviceDetector>("IDeviceDetector").to(LinuxDeviceDetector).inSingletonScope();
  } else {
    throw new Error(
      `Device detection for OS ${ServiceConfig.os} is unsupported.`
    );
  }

  container.bind<interfaces.Factory<IStreamingSource>>("StreamingSourceFactory").toFactory(StreamingSourceFactory);
}

container.bind<interfaces.Factory<Device>>("DeviceFactory").toFactory(DeviceFactory);
container.bind<interfaces.Factory<Stream>>("StreamFactory").toFactory(StreamFactory);
container.bind<interfaces.Factory<Session>>("SessionFactory").toFactory(SessionFactory);

container.bind<Logger>("Logger").toConstantValue(new Logger(ServiceLogger));
container.bind<Logger>("FfmpegLogger").toConstantValue(new Logger(FfmpegLogger));
container.bind<Bootstrapper>("Bootstrapper").to(Bootstrapper);
container.bind<DataService>("DataService").to(DataService);
container.bind<StreamService>("StreamService").to(StreamService).inSingletonScope();
container.bind<SessionService>("SessionService").to(SessionService).inSingletonScope();
container.bind<ProcessExecutionService>("ProcessExecutionService").to(ProcessExecutionService);
container.bind<WebServer>("WebServer").to(WebServer).inSingletonScope();
container.bind<WebsocketServer>("WebsocketServer").to(WebsocketServer).inSingletonScope();
container.bind<ActivationService>("ActivationService").to(ActivationService).inSingletonScope();
container.bind<Scheduler>("Scheduler").to(Scheduler).inSingletonScope();
