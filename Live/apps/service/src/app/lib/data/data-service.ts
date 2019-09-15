import { config } from "../../config/service.config";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { SessionEntity, StreamEntity, SettingsEntity } from "@live/entities";
import { IStreamRepository } from "../streams/i-stream-repository";
import { ISessionRepository } from "../sessions/i-session-repository";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileAsync";
import { ISettingsProvider } from "../settings/i-settings-provider";

/**
 * Provides access to a file based data source
 */
@injectable()
export class DataService implements IStreamRepository, ISessionRepository, ISettingsProvider {
  private _database: any;

  constructor(
    @inject("Logger") private _logger: Logger) {
  }

  public async initializeDatabase(): Promise<void> {
    const adapter = new FileSync(config.database);
    await low(adapter)
      .then((database) => this._database = database)
      .catch((error) => this._logger.error(`Error reading database: ${error}.`));
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
}
