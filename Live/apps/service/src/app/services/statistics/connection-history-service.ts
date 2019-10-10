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
  private _listeningCounter = 0;

  public get connectionCounter(): number {
    return this._connectionCounter;
  }

  public get listeningCounter(): number {
    return this._listeningCounter;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("TimeService") private _timeService: TimeService) {
  }

  public clientSubscribed(clientInfo: ClientInfo): void {
    this._listeningCounter++;

    this._logger.debug(`Client ${clientInfo.ipAddress} subscribed to stream ${clientInfo.streamId}.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now().toISOString(),
      connectionInfoType: ConnectionInfoType.Connected,
      newConnectionCounterValue: this._connectionCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  public clientUnsubscribed(clientInfo: ClientInfo): void {
    this._listeningCounter--;

    this._logger.debug(`Client ${clientInfo.ipAddress} unsubscribed.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now().toISOString(),
      connectionInfoType: ConnectionInfoType.Disconnected,
      newConnectionCounterValue: this._connectionCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  public clientConnected(clientInfo: ClientInfo): void {
    this._connectionCounter++;
  }

  public clientDisconnected(clientInfo: ClientInfo): void {
    // Did the client subscribe to any stream?
    // If yes, decrease the listening counter and push a new Connection history
    // Maybe connection history is not the right term because we are counting 
    // subscriptions or listeners

    this._connectionCounter--;
  }
}
