import { SessionEntity, SettingsEntity, StreamEntity, UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileAsync";
import { config } from "../../config/service.config";
import { Logger } from "../logging/logger";
import { ISessionRepository } from "../sessions/i-session-repository";
import { ISettingsProvider } from "../settings/i-settings-provider";
import { IStreamRepository } from "../streams/i-stream-repository";

/**
 * Provides access to a file based data source
 */
@injectable()
export class DataService implements IStreamRepository, ISessionRepository, ISettingsProvider {
  private _database: low.LowdbAsync<any>;

  constructor(
    @inject("Logger") private _logger: Logger) {
  }

  public async initializeDatabase(): Promise<void> {
    const adapter = new FileSync(config.database);
    try {
      this._database = await low(adapter);
    } catch (error) {
      this._logger.error(`Error reading database: ${error}.`);
    }
    this._database.defaults({ "streams": {}, "sessions": {} });
  }

  public loadSessionEntities(): SessionEntity[] {
    const sessions = this._database.get("sessions").value() as SessionEntity[];
    this._logger.info(`Read ${sessions.length} session entities from database.`);

    return sessions;
  }

  public loadStreamEntities(): StreamEntity[] {
    const streams = this._database.get("streams").value() as StreamEntity[];
    this._logger.info(`Read ${streams.length} stream entities from database.`);

    return streams;
  }

  public getSettings(): SettingsEntity {
    const settings = this._database.get("settings").value() as SettingsEntity;

    return settings;
  }

  public async updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    const updated = await this._database.update("settings", () => settings).write();

    return updated.settings;
  }

  public getUsers(): UserEntity[] {
    const users = this._database.get("users").value() as UserEntity[];
    this._logger.info(`Read ${users.length} user entities from database.`);

    return users;
  }
}
