import { Logger } from "../util/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { ChildProcess } from "child_process";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "./stream";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {

    private _childProcess: ChildProcess;

    constructor(@inject("Logger") private _logger: Logger,
        @inject("WebsocketService") private _websocketService: WebsocketServer,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
        private _device: Device,
        private _stream: Stream) {
    }

    public get hasValidDevice(): boolean {
        return this._device.state !== DeviceState.UnknownDevice;
    }

    public startStreaming(): void {
        this._childProcess = this._processExecutionService.spawn("command");
        this._childProcess.on("stdout", (data) => this._websocketService.emit(this._stream.id, data));
        this._websocketService.addStream(this._stream.id);
    }

    public stopStreaming(): void {
        this._websocketService.removeStream(this._stream.id);
        this._childProcess.kill();
    }
}
