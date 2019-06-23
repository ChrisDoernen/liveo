import { SessionEntity } from "@live/entities";

export interface ISessionRepository {
  loadSessionEntities(): SessionEntity[];
}