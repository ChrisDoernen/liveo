import { StreamEntity, StreamType } from "@live/entities";
import * as faker from "faker";

export class StreamEntityBuilder {
  private readonly _stream: StreamEntity;

  constructor() {
    this._stream = new StreamEntity(
      faker.random.word(),
      faker.random.word(),
      faker.random.words(),
      faker.random.locale(),
      faker.random.word(),
      StreamType.Audio
    )
  }

  public withId(id: string): StreamEntityBuilder {
    this._stream.id = id;
    return this;
  }

  public build(): StreamEntity {
    return this._stream;
  }
}