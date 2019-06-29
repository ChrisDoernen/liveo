import { IStreamingCommandProvider } from "./i-streaming-command-provider";
import { ICommand } from "./i-command";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";

@injectable()
export class StreamingCommandProvider implements IStreamingCommandProvider {
  private _deviceId = "__DEVICEID__";

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("StreamingCommand") private _streamingCommand: ICommand) {
  }

  public getStreamingCommand(deviceId: string): ICommand {
    this._logger.debug(`Returning streaming command for device: ${deviceId}.`);

    return {
      command: this._streamingCommand.command,
      arguments: this.parseArguments(this._streamingCommand.arguments, deviceId)
    };
  }

  private parseArguments(args: string[], deviceId: string): string[] {
    return args.map((argument: string) => argument.replace(this._deviceId, deviceId));
  }
}
