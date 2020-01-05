export class SettingsEntity {
  constructor(
    public defaultSession: string,
    public enableAutoActivation: boolean,
    public bitrate: number,
    public shareSessionReports: boolean,
    public shareErrorReports: boolean) {
  }
}