import { StreamEntity } from "@liveo/entities";

export class GetStreamsAction {
  static readonly type = "[State] GetStreams";
}

export class DeleteStreamAction {
  static readonly type = "[State] DeleteStream";
  constructor(
    public stream: StreamEntity
  ) {
  }
}
