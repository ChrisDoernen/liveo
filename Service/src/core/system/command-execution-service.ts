
import { injectable } from "inversify";
import { exec, ExecException } from "child_process";

@injectable()
export class CommandExecutionService {

    public execute(command: string, callback?: (error: ExecException, stdout: string, stderr: string) => void): void {
        exec(command, callback);
    }

    public executeAndForget(command: string): void {
        exec(command);
    }
}
