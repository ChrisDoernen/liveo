import { SettingsEntity } from "@live/entities";
import * as faker from "faker";

export class SettingsEntityBuilder {
  private readonly _settingsEntity: SettingsEntity;

  constructor() {
    this._settingsEntity = new SettingsEntity(
      faker.random.word(),
      faker.random.boolean(),
      faker.random.number(),
      faker.random.boolean(),
      faker.random.boolean()
    )
  }

  public withdefaultSession(id: string): SettingsEntityBuilder {
    this._settingsEntity.defaultSession = id;
    return this;
  }

  public withAutoActivationEnabled(enableAutoActivation: boolean): SettingsEntityBuilder {
    this._settingsEntity.enableAutoActivation = enableAutoActivation;
    return this;
  }

  public build(): SettingsEntity {
    return this._settingsEntity;
  }
}