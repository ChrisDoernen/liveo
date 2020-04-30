import { ActivationEntity, ActivationState } from "@liveo/entities";

export interface ApplicationState {
  activationState: ActivationState;
  activationEntity: ActivationEntity;
}
