import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { TimeService } from "../time/time.service";
import { ClientInfo } from "./client-info";
import { ConnectionInfo } from "./connection-info";
import { ConnectionInfoType } from "./connection-info-type";

@injectable()
export class ConnectionHistoryService {

  private _connectionHistory: ConnectionInfo[] = [];

  /**
   * Stores the current listeners as map of client ip address and stream id
   */
  private _currentListeners = new Map<string, string>();
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
    this._currentListeners.set(clientInfo.ipAddress, clientInfo.streamId);
    this.clientListens(clientInfo);
  }

  public clientUnsubscribed(clientInfo: ClientInfo): void {
    this._currentListeners.delete(clientInfo.ipAddress);
    this.clientStopesListening(clientInfo);
  }

  public clientConnected(clientInfo: ClientInfo): void {
    this._connectionCounter++;
  }

  public clientDisconnected(clientInfo: ClientInfo): void {
    this._connectionCounter--;

    if (this._currentListeners.has(clientInfo.ipAddress)) {
      clientInfo.streamId = this._currentListeners.get(clientInfo.ipAddress);

      this.clientStopesListening(clientInfo);

      this._currentListeners.delete(clientInfo.ipAddress);
    }
  }

  private clientListens(clientInfo: ClientInfo): void {
    this._listeningCounter++;

    this._logger.debug(`Client ${clientInfo.ipAddress} subscribed to stream ${clientInfo.streamId}.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now().toISOString(),
      connectionInfoType: ConnectionInfoType.Connected,
      newListeningCounterValue: this._listeningCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  private clientStopesListening(clientInfo: ClientInfo): void {
    this._listeningCounter--;

    this._logger.debug(`Client ${clientInfo.ipAddress} unsubscribed.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now().toISOString(),
      connectionInfoType: ConnectionInfoType.Disconnected,
      newListeningCounterValue: this._listeningCounter
    }

    this._connectionHistory.push(connectionInfo);
  }
}
