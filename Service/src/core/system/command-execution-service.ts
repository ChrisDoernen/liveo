
import { injectable } from "inversify";
import { exec, ExecException, spawn } from "child_process";

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
    public execute(command: string,
        callback?: (error: ExecException, stdout: string, stderr: string) => void): void {
        exec(command, callback);
    }

    /**
     * Spawns a child process
     * @param command The command
     * @param stdoutOnData A callback to be executed on stdout data event
     * @param stderrOnData A callback to be executed on stdout data event
     * @param onExit A callback to be executed on exit event
     */
    public spawn(command: string,
        stdoutOnData: (data: Buffer) => void,
        stderrOnData: (data: Buffer) => void,
        onExit: (exitCode: string) => void): void {
        const process = spawn(command);

        process.stdout.on("data", stdoutOnData);
        process.stderr.on("data", stderrOnData);
        process.on("exit", onExit);
    }
}
