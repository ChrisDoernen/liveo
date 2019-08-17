export class ActivationEntity {
  constructor(
    public sessionId: string,
    public startTime?: number,
    public endTime?: number,
    public shutdownTime?: number) {
  }
}
