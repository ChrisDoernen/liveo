import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { ChildProcess } from "child_process";
import { WebsocketServer } from "../core/websocket-server";
import { ICommand } from "../streaming-command/i-command";
import { IStreamingCommandProvider } from "../streaming-command/i-streaming-command-provider";
import { EVENTS } from "@live/constants";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {
  private _childProcess: ChildProcess;
  private _streamingCommand: ICommand;
  public isStreaming: boolean;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("IStreamingCommandProvider") _streamingCommandProvider: IStreamingCommandProvider,
    @inject("WebsocketService") private _websocketServer: WebsocketServer,
    @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService,
    private _device: Device,
    private _streamId: string) {
    this._streamingCommand = _streamingCommandProvider.getStreamingCommand(_device.id);
  }

  public get hasValidDevice(): boolean {
    return this._device.state !== DeviceState.UnknownDevice;
  }

  public startStreaming(): void {
    this._websocketServer.addStream(this._streamId);
    this._childProcess = this._processExecutionService.spawn(this._streamingCommand.command, this._streamingCommand.arguments);
    this._childProcess.on("error", error => {
      this._logger.error(`Error spawning child process for device ${this._device.id}: ${error}.`)
    });
    this._logger.debug(`Started child process for device ${this._device.id} with PID ${this._childProcess.pid}.`);
    this._childProcess.stdout.on("data", (data: Buffer) => {
      this._websocketServer.emitStreamData(this._streamId, data);
    });
    this._childProcess.stderr.on("data", data => this._ffmpegLogger.info(`${data}`));
    this._childProcess.on("close", code => {
      this.isStreaming = false;

      // Code 255 is returned if process was killed manually
      if (code === 255) {
        this._websocketServer.emitEventMessage(this._streamId, EVENTS.streamEndedExpected, "The stream ended as expected.");
      } else {
        this._websocketServer.emitEventMessage(this._streamId, EVENTS.streamEndedUnexpected, "The stream ended unexpected.");
      }
      this._logger.info(`Child process for device ${this._device.id} exited code: ${code}.`);

    });
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._websocketServer.removeStream(this._streamId);
    this._childProcess.kill();
    this._logger.debug(`Killing child process for device ${this._device.id} with PID ${this._childProcess.pid}.`);
  }
}
