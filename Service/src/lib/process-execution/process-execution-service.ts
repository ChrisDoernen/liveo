import { injectable } from "inversify";
import { exec, ExecException, spawn, ChildProcess } from "child_process";

/**
 * Wrapper for child_process
 */
@injectable()
export class ProcessExecutionService {

    /**
     * Executes a command
     * @param command The command to execute
     * @param callback A callback caled after execution completes with the respective output
     */
    public execute(command: string,
        callback?: (error: ExecException, stdout: string, stderr: string) => void): void {
        exec(command, callback);
    }

    public spawn(command: string, args: string[]): ChildProcess {
        return spawn(command, args);
    }
}
