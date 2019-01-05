import { Logger } from "../util/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { ChildProcess } from "child_process";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "./stream";
import { DataService } from "../data/data-service";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {

    private _childProcess: ChildProcess;
    private _command: string;
    private _arguments: string[] = [];

    constructor(@inject("Logger") private _logger: Logger,
        @inject("WebsocketService") private _websocketService: WebsocketServer,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
        @inject("DataService") private _dataService: DataService,
        private _device: Device,
        private _stream: Stream) {
        this.parseFfmpegConfig(this._dataService.loadFfmpegConfig());
    }

    private parseFfmpegConfig(ffmpegConfig: any): void {
        this._command = ffmpegConfig.command;
        ffmpegConfig.arguments.forEach((argument: string) => {
            this._arguments.push(argument.replace("__deviceId__", this._device.id));
        });
    }

    public get hasValidDevice(): boolean {
        return this._device.state !== DeviceState.UnknownDevice;
    }

    public startStreaming(): void {
        this._websocketService.addStream(this._stream.id);
        this._childProcess = this._processExecutionService.spawn(this._command, this._arguments);
        this._childProcess.on("error", (error) => this._logger.error(`Error spawning child process: ${error}.`));
        this._logger.debug(`Started child process from device ${this._device.id} and PID ${this._childProcess.pid}.`);
        this._childProcess.stdout.on("data", (data) => this._websocketService.emit(this._stream.id, data));
        this._childProcess.on("close", (code) => this._logger.info(`Child process exited with code ${code}.`));
    }

    public stopStreaming(): void {
        this._childProcess.kill();
        this._logger.debug(`Killing child process with id ${this._childProcess.pid}.`);
        this._websocketService.removeStream(this._stream.id);
    }
}
