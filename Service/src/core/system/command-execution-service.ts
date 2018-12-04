
import { injectable } from "inversify";
import { exec } from "child_process";

@injectable()
export class CommandExecutionService {

    public executeWithResponse(command: string): string {
        return "fake result";
    }

    public executeAndForget(command: string): void {
        exec(command);
    }
}
