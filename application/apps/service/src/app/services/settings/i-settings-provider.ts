import { SettingsEntity } from "@liveo/entities";

export interface ISettingsProvider {
  getSettings(): SettingsEntity;
  updateSettings(settings: SettingsEntity): Promise<SettingsEntity>;
}