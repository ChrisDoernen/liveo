import { ClientInfo } from "../../lib/statistics/client-info";
import * as faker from "faker";

export class ClientInfoBuilder {

  private _clientInfo: ClientInfo;

  constructor() {
    this._clientInfo = {
      ipAddress: faker.random.word(),
      userAgent: faker.random.word(),
      streamId: faker.random.word()
    }
  }

  public withIpAdress(ipAddress: string): ClientInfoBuilder {
    this._clientInfo.ipAddress = ipAddress;

    return this;
  }

  public withStreamId(streamId: string): ClientInfoBuilder {
    this._clientInfo.streamId = streamId;

    return this;
  }

  public build(): ClientInfo {
    return this._clientInfo;
  }
}