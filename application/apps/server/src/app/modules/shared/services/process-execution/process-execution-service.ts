import { Injectable } from "@nestjs/common";
import { ChildProcess, exec, spawn } from "child_process";

/**
 * Wrapper for child_process
 */
@Injectable()
export class ProcessExecutionService {

  /**
   * Executes a command
   * @param command The command to execute
   * @param callback A callback caled after execution completes with the respective output
   */
  public execute(command: string, callback?: (error: any, stdout: string, stderr: string) => void): void {
    exec(command, callback);
  }

  public executeAsync(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    })
  }

  public spawn(command: string, args: string[]): ChildProcess {
    return spawn(command, args);
  }
}
