import { SessionEntity } from "../../../../../libs/entities/src/lib/session.entity";
import { StreamEntity } from "../../../../../libs/entities/src/lib/stream.entity";
import { ActivationState } from "../../../../../libs/entities/src/lib/activation-state";
import { ActivationEntity } from "../../../../../libs/entities/src/lib/activation.entity";

export class ActivityEntity {
  constructor(public activationState: ActivationState,
    public activation: ActivationEntity,
    public session: SessionEntity,
    public streams: StreamEntity[]) {
  }
}