
import { injectable } from "inversify";
import { exec, ExecException } from "child_process";

/**
 * Wrapper for child_process
 */
@injectable()
export class CommandExecutionService {

    /**
     * Executes a command
     * @param command The command to execute
     * @param callback A callback to be called on error, stout and stderr events
     */
    public execute(command: string, callback?: (error: ExecException, stdout: string, stderr: string) => void): void {
        exec(command, callback);
    }
}
