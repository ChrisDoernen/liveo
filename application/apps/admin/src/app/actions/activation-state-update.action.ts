import { ActivationStateEntity } from "@liveo/entities";

export class ActivationStateUpdateAction {
  static readonly type = "[State] Activation State Update";
  constructor(
    public activationState: ActivationStateEntity
  ) {
  }
}
