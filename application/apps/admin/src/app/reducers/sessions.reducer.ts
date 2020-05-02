import { Injectable } from '@angular/core';
import { SessionEntity } from "@liveo/entities";
import { Action, State, StateContext } from '@ngxs/store';
import { DeleteSessionAction, GetSessionsAction } from "../actions/sessions.actions";
import { SessionsClient as SessionsClient } from "../services/session/session.client";

@State<SessionEntity[]>({
  name: "sessions",
  defaults: []
})
@Injectable()
export class SessionsReducer {

  constructor(
    private readonly _sessionsClient: SessionsClient
  ) {
  }

  @Action(GetSessionsAction)
  public async getSessions(ctx: StateContext<SessionEntity[]>, action: GetSessionsAction) {
    const sessions = await this._sessionsClient.getSessions();
    ctx.setState(sessions);
  }

  @Action(DeleteSessionAction)
  public async deleteSession(ctx: StateContext<SessionEntity[]>, action: DeleteSessionAction) {
    const sessions = await this._sessionsClient.deleteSession(action.session);
    ctx.setState(sessions);
  }
}
