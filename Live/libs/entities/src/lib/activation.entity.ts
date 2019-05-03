export class ActivationEntity {
  constructor(
    public sessionId: string,
    public timeStarting?: number,
    public timeEnding?: number,
    public timeServerShutdown?: number) {
  }
}
