import { StreamEntity } from "@live/entities";

export interface IStreamRepository {
  loadStreamEntities(): StreamEntity[];
}