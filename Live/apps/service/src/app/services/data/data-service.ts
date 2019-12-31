import { SessionEntity, SettingsEntity, StreamEntity, UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import generate from "nanoid/non-secure/generate";
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

  private _database: any;

  constructor(
    @inject("Logger") private _logger: Logger) {
  }

  public initializeDatabase(): void {
    const adapter = new FileSync(config.database);
    try {
      this._database = low(adapter);
    } catch (error) {
      this._logger.error(`Error reading database: ${error}.`);
    }
  }

  public loadSessionEntities(): SessionEntity[] {
    const sessions = this._database.get("sessions").value() as SessionEntity[];
    this._logger.debug(`Read ${sessions.length} session entities from database.`);

    return sessions;
  }

  public createSessionEntity(sessionEntity: SessionEntity): SessionEntity {
    sessionEntity.id = this.createNewId();
    this._database.get("sessions").push(sessionEntity).write();

    return sessionEntity;
  }

  public deleteSession(sessionEntity: SessionEntity): void {
    this._database.get("sessions").remove(sessionEntity).write();
  }

  public loadStreamEntities(): StreamEntity[] {
    const streams = this._database.get("streams").value() as StreamEntity[];
    this._logger.debug(`Read ${streams.length} stream entities from database.`);

    return streams;
  }

  public createStreamEntity(streamEntity: StreamEntity): StreamEntity {
    streamEntity.id = this.createNewId();
    this._database.get("streams").push(streamEntity).write();

    return streamEntity;
  }

  public deleteStream(streamEntity: StreamEntity): void {
    this._database.get("streams").remove(streamEntity).write();
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
    this._logger.debug(`Read ${users.length} user entities from database.`);

    return users;
  }

  private createNewId(): string {
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
    const id = generate(alphabet, 10);

    return id;
  }
}
