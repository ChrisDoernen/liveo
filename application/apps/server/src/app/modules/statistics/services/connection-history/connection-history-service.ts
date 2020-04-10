import { Injectable } from "@nestjs/common";
import { Logger } from "../../../core/services/logging/logger";
import { TimeService } from "../../../shared/services/time/time.service";
import { ClientInfo } from "../../connections/client-info";
import { ConnectionInfo } from "../../connections/connection-info";
import { ConnectionInfoType } from "../../connections/connection-info-type";
import { ConnectionReport } from "../../connections/connection-report";

@Injectable()
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
    private readonly _logger: Logger,
    private readonly _timeService: TimeService
  ) {
  }

  public clientSubscribed(clientInfo: ClientInfo): void {
    this._currentListeners.set(clientInfo.ipAddress, clientInfo.streamId);
    this.clientStartsListening(clientInfo);
  }

  public clientUnsubscribed(clientInfo: ClientInfo): void {
    this._currentListeners.delete(clientInfo.ipAddress);
    this.clientStopsListening(clientInfo);
  }

  public clientConnected(clientInfo: ClientInfo): void {
    this._connectionCounter++;
  }

  public clientDisconnected(clientInfo: ClientInfo): void {
    this._connectionCounter--;

    if (this._currentListeners.has(clientInfo.ipAddress)) {
      clientInfo.streamId = this._currentListeners.get(clientInfo.ipAddress);

      this.clientStopsListening(clientInfo);

      this._currentListeners.delete(clientInfo.ipAddress);
    }
  }

  private clientStartsListening(clientInfo: ClientInfo): void {
    this._listeningCounter++;

    this._logger.debug(`Client ${clientInfo.ipAddress} subscribed to stream ${clientInfo.streamId}.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now(),
      connectionInfoType: ConnectionInfoType.Connected,
      newListeningCounterValue: this._listeningCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  private clientStopsListening(clientInfo: ClientInfo): void {
    this._listeningCounter--;

    this._logger.debug(`Client ${clientInfo.ipAddress} unsubscribed.`);
    this._logger.debug(`Number of clients listening: ${this._listeningCounter}.`);

    const connectionInfo: ConnectionInfo = {
      clientInfo: clientInfo,
      timestamp: this._timeService.now(),
      connectionInfoType: ConnectionInfoType.Disconnected,
      newListeningCounterValue: this._listeningCounter
    }

    this._connectionHistory.push(connectionInfo);
  }

  public getConnectionReport(): ConnectionReport {
    const listenersToTimeMs = new Map<string, number>();
    const listenerToOpenConnection = new Map<string, Date>();

    this._connectionHistory.forEach((connectionInfo) => {
      const ipAddress = connectionInfo.clientInfo.ipAddress;

      if (connectionInfo.connectionInfoType === ConnectionInfoType.Connected) {
        // Add opened connection to map
        if (!listenerToOpenConnection.get(ipAddress)) {
          listenerToOpenConnection.set(ipAddress, connectionInfo.timestamp);
        }
      } else {
        // Get the opened connection and calculate the time difference
        const connectedTimestamp = listenerToOpenConnection.get(ipAddress);
        let listeningTimeMs = connectionInfo.timestamp.getTime() - connectedTimestamp.getTime();

        // If the already has a entry in the map, add the new listening time and update the entry. 
        const listenerTimeMs = listenersToTimeMs.get(ipAddress);
        if (listenerTimeMs) {
          listeningTimeMs += listenerTimeMs;
        }
        listenersToTimeMs.set(ipAddress, listeningTimeMs);

        // Delete the connection from the open connections map
        listenerToOpenConnection.delete(ipAddress);
      }
    });

    const uniqueListeners = listenersToTimeMs.size;

    const minutesListened = 0;
    listenersToTimeMs.forEach((listenerTimeMs) => minutesListened + listenerTimeMs * 1000);

    const minutesListenedPerListener = minutesListened * 1000 / uniqueListeners;

    return {
      uniqueListeners,
      minutesListened,
      minutesListenedPerListener
    }
  }
}
