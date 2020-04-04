import { ActivationEntity } from "@liveo/entities";
import * as faker from "faker";

export class ActivationEntityBuilder {
  private readonly _activation: ActivationEntity;

  constructor() {
    this._activation = new ActivationEntity(
      faker.random.word()
    )
  }

  public withSessionId(id: string): ActivationEntityBuilder {
    this._activation.sessionId = id;
    return this;
  }

  public withStartTime(startTime: string): ActivationEntityBuilder {
    this._activation.startTime = startTime;
    return this;
  }

  public withEndTime(endTime: string): ActivationEntityBuilder {
    this._activation.endTime = endTime;
    return this;
  }

  public withShutdownTime(shutdownTime: string): ActivationEntityBuilder {
    this._activation.shutdownTime = shutdownTime;
    return this;
  }

  public build(): ActivationEntity {
    return this._activation;
  }
}