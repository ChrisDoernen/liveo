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

    private _command: string = "ffmpeg";

    private _args: string[] = ["-y", "-f", "alsa", "-i", "hw:0", "-rtbufsize", "64",
        "-probesize", "64", "-acodec", "libmp3lame", "-ab", "196k", "-ac", "1",
        "-reservoir", "0", "-f", "mp3", "-fflags", "+nobuffer", "-"];

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
        this._websocketService.addStream(this._stream.id);
        this._childProcess = this._processExecutionService.spawn("ffmpeg", this._args);
        this._childProcess.stdout.on("data", (data) => this._websocketService.emit(this._stream.id, data));
        this._childProcess.on("close", () => this._logger.warn("Process exited"));
    }

    public stopStreaming(): void {
        this._childProcess.kill();
        this._websocketService.removeStream(this._stream.id);
    }
}
