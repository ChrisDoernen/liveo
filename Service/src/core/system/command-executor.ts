import { injectable } from "inversify";
import { exec } from "child_process";

@injectable()
export class CommandExecutor {

    public execute(command: string): string {
        return "fake result";
    }

    public executeAndForget(command: string): void {
        exec(command);
    }
}
