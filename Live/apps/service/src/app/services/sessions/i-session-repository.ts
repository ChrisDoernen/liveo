import { SessionEntity } from "@live/entities";

export interface ISessionRepository {
  loadSessionEntities(): SessionEntity[];
  createSessionEntity(sessionEntity: SessionEntity): SessionEntity
  deleteSession(sessionEntity: SessionEntity): void;
}