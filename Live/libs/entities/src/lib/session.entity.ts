export class SessionEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public timeStarted: number,
    public timeEnded: number,
    public streams: string[]) {
  }
}
