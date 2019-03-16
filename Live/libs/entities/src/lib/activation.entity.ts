/**
 * Activation entity
 */
export class ActivationEntity {
  /**
   * A activation
   *
   * @param sessionId The id of the session to activate
   * @param timeStarting The time the session starts
   * @param timeEnding The time the session ends
   * @param timeServerShutdown The shutdown time of the server
   */
  constructor(
    public sessionId: string,
    public timeStarting?: number,
    public timeEnding?: number,
    public timeServerShutdown?: number
  ) {}
}
