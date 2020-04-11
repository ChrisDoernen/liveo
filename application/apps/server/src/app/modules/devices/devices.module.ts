import { Global, Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { StateModule } from "../state/state.module";
import { StreamingModule } from "../streaming/streaming.module";
import { DevicesController } from "./controller/devices.controller";
import { DeviceFactoryProvider } from "./device/device-factory.provider";
import { DeviceDetectorProvider } from "./services/device-detection/device-detector.provider";
import { DevicesService } from "./services/devices/device.service";

@Global()
@Module({
  imports: [
    SharedModule,
    StateModule,
    StreamingModule
  ],
  controllers: [
    DevicesController
  ],
  providers: [
    DevicesService,
    DeviceDetectorProvider,
    DeviceFactoryProvider,
  ]
})
export class DevicesModule { }
