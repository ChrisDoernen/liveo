import { SessionEntity } from "@live/entities";
import * as faker from "faker";

export class SessionEntityBuilder {
  private readonly _session: SessionEntity;

  constructor() {
    this._session = new SessionEntity(
      faker.random.word(),
      faker.random.word(),
      faker.random.words(),
      []
    )
  }

  public withId(id: string): SessionEntityBuilder {
    this._session.id = id;
    return this;
  }

  public withStreams(streamIds: string[]): SessionEntityBuilder {
    this._session.streams = streamIds;
    return this;
  }

  public build(): SessionEntity {
    return this._session;
  }
}