import { StreamEntity } from "@liveo/entities";

export interface IStreamRepository {
  getStreamEntities(): StreamEntity[];
  getStreamEntity(id: string): StreamEntity;
  createStreamEntity(streamEntity: StreamEntity): StreamEntity;
  deleteStreamEntity(id: string): void;
}