export class ActivationEntity {
  constructor(
    public sessionId: string,
    public startTime?: string,
    public endTime?: string,
    public shutdownTime?: string
  ) {
  }
}
