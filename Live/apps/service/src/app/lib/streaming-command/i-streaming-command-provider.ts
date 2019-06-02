import { ICommand } from "./i-command";

export interface IStreamingCommandProvider {
  /**
   * Gets the command for streaming. 
   * @param input Either a device id or a file in simulation context
   */
  getStreamingCommand(input: string): ICommand;
}