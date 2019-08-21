import { SessionEntity } from "./session.entity";
import { StreamEntity } from "./stream.entity";
import { ActivationEntity } from "./activation.entity";

/**
 * An entity containing the traversed entities of the activation
 */
export class ApplicationStateEntity {
  constructor(
    public activation: ActivationEntity,
    public session: SessionEntity,
    public streams: StreamEntity[]) {
  }
}