import { SettingsEntity } from "@live/entities";

export interface ISettingsProvider {
  getSettings(): SettingsEntity;
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity>;
}