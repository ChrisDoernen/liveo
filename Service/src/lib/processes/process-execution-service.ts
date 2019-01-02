import { injectable } from "inversify";
import { exec, ExecException, spawn, ChildProcess } from "child_process";

/**
 * Wrapper for child_process
 */
@injectable()
export class ProcessExecutionService {

    /**
     * Executes a command and returnes output as string
     * @param command The command to execute
     * @param callback A callback to be called on error, stout and stderr events
     */
    public execute(command: string,
        callback?: (error: ExecException, stdout: string, stderr: string) => void): void {
        exec(command, callback);
    }

    public spawn(command: string): ChildProcess {
        return spawn(command);
    }
}
