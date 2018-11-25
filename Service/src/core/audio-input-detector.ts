export class AudioInputDetector {

    public audioInputs: string[];

    constructor(private commandExecutionService: any) {
        this.detectInputs();
    }

    private detectInputs(): void {
        const response = this.commandExecutionService.execute();
        this.parseRespone("test");
    }

    private parseRespone(response: string): void {
        this.audioInputs.push(response);
    }

}
