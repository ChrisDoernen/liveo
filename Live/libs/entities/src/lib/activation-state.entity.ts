import { ActivationState } from "./activation-state";
import { ActivationEntity } from "./activation.entity";
import { SessionEntity } from "./session.entity";
import { StreamEntity } from "./stream.entity";

/**
 * An entity containing the traversed entities of the activation
 */
export class ActivationStateEntity {
  constructor(
    public state: ActivationState,
    public activation?: ActivationEntity,
    public session?: SessionEntity,
    public streams?: StreamEntity[]) {
  }
}
