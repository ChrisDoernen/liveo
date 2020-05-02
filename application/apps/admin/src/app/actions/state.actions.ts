import { ActivationEntity, ActivationStateEntity } from "@liveo/entities";

export class ActivationStateUpdateAction {
  static readonly type = "[State] ActivationStateUpdate";
  constructor(
    public activationState: ActivationStateEntity
  ) { }
}

export class ActivationUpdateAction {
  static readonly type = "[State] ActivationUpdate";
  constructor(
    public activation: ActivationEntity
  ) { }
}

