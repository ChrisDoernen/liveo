import { Injectable } from '@angular/core';
import { ActivationStateEntity } from "@liveo/entities";
import { ActivationStateService } from "@liveo/services";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ActivationStateUpdateAction, ActivationUpdateAction } from "../actions/state.actions";
import { SessionsClient } from "../services/session/session.client";

@State<ActivationStateEntity>({
  name: "activationState",
  defaults: null
})
@Injectable()
export class ActivationStateReducer {

  constructor(
    private readonly _activationStateService: ActivationStateService,
    private readonly _sessionClient: SessionsClient
  ) {
  }

  @Action(ActivationStateUpdateAction)
  public updateActivationState(ctx: StateContext<ActivationStateEntity>, action: ActivationStateUpdateAction) {
    ctx.setState(action.activationState);
  }

  @Action(ActivationUpdateAction)
  public async updateActivation(ctx: StateContext<ActivationStateEntity>, action: ActivationUpdateAction) {
    const activation = action.activation;

    if (!activation) {
      ctx.setState(new ActivationStateEntity("NoActivation"));
      return;
    }

    const state = ctx.getState();

    const activationState = this._activationStateService.determineActivationState(action.activation);

    let session = state?.session;
    let streams = state?.streams;

    if (activation.sessionId !== state?.session.id) {
      session = await this._sessionClient.getSession(activation.sessionId);
    }

    ctx.setState({
      activation: activation,
      state: activationState,
      session,
      streams
    });
  }

  @Selector()
  static activationExisting(state: ActivationStateEntity) {
    return state?.state !== "NoActivation";
  }
}