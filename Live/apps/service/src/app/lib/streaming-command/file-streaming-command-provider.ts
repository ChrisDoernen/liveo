import { IStreamingCommandProvider } from "./i-streaming-command-provider";
import { ICommand } from "./i-command";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";

@injectable()
export class FileStreamingCommandProvider implements IStreamingCommandProvider {
  private _file = "__FILENAME__";

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("StreamingCommand") private _streamingCommand: ICommand) {
  }

  public getStreamingCommand(filename: string): ICommand {
    this._logger.warn(`Returning streaming command for file: ${filename}.`);

    return {
      command: this._streamingCommand.command,
      arguments: this.parseArguments(this._streamingCommand.arguments, filename)
    };
  }

  private parseArguments(args: string[], filename: string): string[] {
    return args.map((argument: string) => argument.replace(this._file, filename));
  }
}
