import { Injectable } from '@angular/core';
import { StreamEntity } from "@liveo/entities";
import { Action, State, StateContext } from '@ngxs/store';
import { DeleteStreamAction, GetStreamsAction } from "../actions/streams.actions";
import { StreamsClient } from "../services/stream/streams.client";

@State<StreamEntity[]>({
  name: "streams",
  defaults: []
})
@Injectable()
export class StreamsReducer {

  constructor(
    private readonly _streamsClient: StreamsClient
  ) {
  }

  @Action(GetStreamsAction)
  public async getStreams(ctx: StateContext<StreamEntity[]>, action: GetStreamsAction) {
    const streams = await this._streamsClient.getStreams();
    ctx.setState(streams);
  }

  @Action(DeleteStreamAction)
  public async deleteStream(ctx: StateContext<StreamEntity[]>, action: DeleteStreamAction) {
    const streams = await this._streamsClient.deleteStream(action.stream);
    ctx.setState(streams);
  }
}
