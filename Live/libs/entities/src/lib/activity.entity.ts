import { SessionEntity } from "./session.entity";
import { StreamEntity } from "./stream.entity";
import { ActivationState } from "./activation-state";
import { ActivationEntity } from "./activation.entity";

export class ActivityEntity {
  constructor(public activationState: ActivationState,
    public activation: ActivationEntity,
    public session: SessionEntity,
    public streams: StreamEntity[]) {
  }
}