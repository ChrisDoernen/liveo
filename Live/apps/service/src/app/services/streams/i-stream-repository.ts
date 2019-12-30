import { StreamEntity } from "@live/entities";

export interface IStreamRepository {
  loadStreamEntities(): StreamEntity[];
  createStreamEntity(streamEntity: StreamEntity): StreamEntity;
  deleteStream(streamEntity: StreamEntity): void;
}