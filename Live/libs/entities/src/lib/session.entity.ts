/**
 * Session data transfer object
 */
export class SessionEntity {
  /**
   * Represents a streaming session
   *
   * @param id The id of the stream
   * @param title The title of the stream
   * @param description The description of the stram
   * @param timeStarted The time the stream was started the last time
   * @param timeEnded The time the stream ended the last time
   * @param streams The strems of the session
   */
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public timeStarted: number,
    public timeEnded: number,
    public streams: string[]
  ) {}
}
