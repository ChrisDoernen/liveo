import { config } from "../../config/service.config";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { SessionEntity, StreamEntity } from "@live/entities";
import { IStreamRepository } from "../streams/i-stream-repository";
import { ISessionRepository } from "../sessions/i-session-repository";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileAsync";

/**
 * Provides access to a file based data source
 */
@injectable()
export class DataService implements IStreamRepository, ISessionRepository {
  private _db: any;

  constructor(@inject("Logger") private _logger: Logger) {
  }

  public async initializeDatabase(): Promise<void> {
    const adapter = new FileSync(config.database);
    await low(adapter)
      .then((db) => this._db = db)
      .catch((error) => this._logger.error(`Error reading database: ${error}.`));
    this._db.defaults({ "streams": {}, "sessions": {} });
  }

  public loadSessionEntities(): SessionEntity[] {
    const sessions = this._db.get("sessions").value() as SessionEntity[];
    this._logger.info(`Read ${sessions.length} session entities from db.`);

    return sessions;
  }

  public loadStreamEntities(): StreamEntity[] {
    const streams = this._db.get("streams").value() as StreamEntity[];
    this._logger.info(`Read ${streams.length} session entities from db.`);

    return streams;
  }
}
