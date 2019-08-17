export class SessionEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public streams: string[]) {
  }
}
