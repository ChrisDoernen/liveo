import { SessionEntity, SettingsEntity, StreamEntity, ThemeEntity, UserEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { existsSync } from "fs";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { AppConfig } from "../../../core/configuration/app-config";
import { Logger } from "../../../core/services/logging/logger";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { DBSchema } from "./data-schema.enum";

/**
 * Provides access to a file based data source
 */
@Injectable()
export class DataService {

  private _database: any;

  constructor(
    appConfig: AppConfig,
    private readonly _logger: Logger,
    private readonly _idGenerator: IdGenerator
  ) {
    this.initializeDatabase(appConfig);
  }

  public initializeDatabase(appConfig: AppConfig): void {
    const db = appConfig.database;

    if (!existsSync(db)) {
      const error = new Error(`Database file does not exist: ${db}.`);
      this._logger.error(error.message);
      throw error;
    }

    const adapter = new FileSync(db);
    this._database = low(adapter);
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

  public getDefaultTheme(): ThemeEntity {
    return this._database.get(`${DBSchema.THEME}.default`).value() as ThemeEntity;
  }

  public getTheme(): ThemeEntity {
    return this._database.get(DBSchema.THEME).value() as ThemeEntity;
  }

  public async updateTheme(theme: ThemeEntity): Promise<ThemeEntity> {
    const updated = await this._database.update(DBSchema.THEME, () => theme).write();

    return updated.theme;
  }

  public getThemeLogo(context: string): string {
    return this._database.get(`${DBSchema.THEME}.logo-${context}`).value() as string;
  }

  private createNewId(): string {
    return this._idGenerator.generateId();
  }
}
