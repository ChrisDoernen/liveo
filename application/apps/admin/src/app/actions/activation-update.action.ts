import { ActivationEntity } from "@liveo/entities";

export class ActivationUpdateAction {
  static readonly type = "[State] Activation Update";
  constructor(
    public activation: ActivationEntity
  ) { }
}
