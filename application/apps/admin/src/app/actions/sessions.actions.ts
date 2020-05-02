import { SessionEntity } from "@liveo/entities";

export class GetSessionsAction {
  static readonly type = "[State] GetSessions";
}

export class DeleteSessionAction {
  static readonly type = "[State] DeleteSession";
  constructor(
    public session: SessionEntity
  ) {
  }
}
