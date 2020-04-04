import { SessionEntity } from "@liveo/entities";

export interface ISessionRepository {
  getSessionEntities(): SessionEntity[];
  getSessionEntity(id: string): SessionEntity;
  createSessionEntity(sessionEntity: SessionEntity): SessionEntity
  deleteSessionEntity(id: string): void;
}