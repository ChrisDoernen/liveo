import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ClientInfo } from "./client-info";
import { ConnectionInfoType } from "./connection-info-type";
import { TimeService } from "../time/time.service";
import { ConnectionInfo } from "./connection-info";

@injectable()
export class ConnectionHistoryService {

  private _connectionHistory: ConnectionInfo[] = [];
  private _connectionCounter = 0;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("TimeService") private _timeService: TimeService) {
  }

  public clientSubscribed(clientInfo: ClientInfo): void {
    this._connectionCounter++;

    this._logger.debug(`Client ${clientInfo.ipAddress} subscribed to stream ${clientInfo.streamId}.`);
    this._logger.debug(`Number of clients connected: ${this._connectionCounter}.`);

    const connectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now(),
      connectionInfoType: ConnectionInfoType.Connected,
      newConnectionCounterValue: this._connectionCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  public clientUnsubscribed(clientInfo: ClientInfo): void {
    this._connectionCounter--;

    this._logger.debug(`Client ${clientInfo.ipAddress} disconnected.`);
    this._logger.debug(`Number of clients connected: ${this._connectionCounter}.`);

    const connectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now(),
      connectionInfoType: ConnectionInfoType.Disconnected,
      newConnectionCounterValue: this._connectionCounter
    }

    this._connectionHistory.push(connectionInfo);
  }
}
