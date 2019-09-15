import { SettingsEntity } from "@live/entities";

export interface ISettingsProvider {
  getSettings(): SettingsEntity;
}