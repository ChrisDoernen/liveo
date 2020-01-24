import { SessionEntity, SettingsEntity, StreamEntity, UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { config } from "../../config/service.config";
import { IUserProvider } from "../authentication/i-user-provider";
import { IdGenerator } from "../id-generation/id-generator";
import { Logger } from "../logging/logger";
import { ISessionRepository } from "../sessions/i-session-repository";
import { ISettingsProvider } from "../settings/i-settings-provider";
import { IStreamRepository } from "../streams/i-stream-repository";
import { DBSchema } from "./data-schema.enum";

/**
 * Provides access to a file based data source
 */
@injectable()
export class DataService implements IStreamRepository, ISessionRepository, ISettingsProvider, IUserProvider {

  private _database: any;

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("IdGenerator") private readonly _idGenerator: IdGenerator) {
  }

  public initializeDatabase(): void {
    const adapter = new FileSync(config.database);
    try {
      this._database = low(adapter);
    } catch (error) {
      this._logger.error(`Error reading database: ${error}.`);
    }
  }

  public getSessionEntities(): SessionEntity[] {
    return this._database.get(DBSchema.SESSIONS).value() as SessionEntity[];
  }

  public getSessionEntity(id: string): SessionEntity {
    return this._database.get(DBSchema.SESSIONS).find({ id }).value() as SessionEntity;
  }

  public createSessionEntity(sessionEntity: SessionEntity): SessionEntity {
    sessionEntity.id = this.createNewId();
    this._database.get(DBSchema.SESSIONS).push(sessionEntity).write();

    return sessionEntity;
  }

  public deleteSessionEntity(id: string): void {
    this._database.get(DBSchema.SESSIONS).remove({ id }).write();
  }

  public getStreamEntities(): StreamEntity[] {
    return this._database.get(DBSchema.STREAMS).value() as StreamEntity[];
  }

  public getStreamEntity(id: string): StreamEntity {
    return this._database.get(DBSchema.STREAMS).find({ id }).value() as StreamEntity;
  }

  public createStreamEntity(streamEntity: StreamEntity): StreamEntity {
    streamEntity.id = this.createNewId();
    this._database.get(DBSchema.STREAMS).push(streamEntity).write();

    return streamEntity;
  }

  public deleteStreamEntity(id: string): void {
    this._database.get(DBSchema.STREAMS).remove({ id }).write();
  }

  public getSettings(): SettingsEntity {
    return this._database.get(DBSchema.SETTINGS).value() as SettingsEntity;
  }

  public async updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    const updated = await this._database.update(DBSchema.SETTINGS, () => settings).write();

    return updated.settings;
  }

  public getUser(username: string): UserEntity {
    return this._database.get(DBSchema.USERS).find({ username }).value() as UserEntity;
  }

  private createNewId(): string {
    return this._idGenerator.generateId();
  }
}
