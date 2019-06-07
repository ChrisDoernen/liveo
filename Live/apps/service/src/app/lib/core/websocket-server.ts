import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import * as socketio from "socket.io";
import { Socket } from "socket.io";
import { ENDPOINTS, EVENTS } from "@live/constants";
import { ConnectionHistoryService } from "../statistic/connection-history-service";
import { ClientInfo } from "../statistic/client-info";

@injectable()
export class WebsocketServer {
  private _websocketServer: any;

  /**
   * The currently available streams that are represented as rooms in socket.io
   */
  private _streams: string[] = [];

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("ConnectionHistoryService") private _connectionHistoryService: ConnectionHistoryService) {
  }

  public initializeAndListen(server: any): void {
    const websocketEndpoint = ENDPOINTS.api + ENDPOINTS.websocket;
    const websocketServer = socketio(server, { path: websocketEndpoint });

    websocketServer.on("connection", this.onConnection.bind(this));
    this._websocketServer = websocketServer;
    this._logger.info("Websocket server started.");
  }

  private onConnection(socket: Socket): void {
    this.onConnect(socket);

    socket.on("subscribe", streamId => {
      this.subscribe(socket, streamId);
    });

    socket.on("disconnect", () => {
      this.onDisconnect(socket);
    });
  }

  private onConnect(socket: Socket): void {
  }

  private onDisconnect(socket: Socket): void {
    const clientInfo = this.getClientInfo(socket);
    this._connectionHistoryService.clientDisconnected(clientInfo);
  }

  private subscribe(socket: Socket, streamId: any): void {
    const id = this._streams.find(stream => stream === streamId);

    if (!id) {
      this._logger.info(`Subscription for stream ${id} not possible, stream is not started.`);
      socket.emit(EVENTS.subscriptionError, "The stream is not started.");
    } else {
      socket.join(id);

      const clientInfo = this.getClientInfo(socket, streamId);
      this._connectionHistoryService.clientSubscribed(clientInfo);
    }
  }

  public addStream(id: string): void {
    this._streams.push(id);
  }

  public removeStream(id: string): void {
    const index = this._streams.indexOf(id);
    if (index > -1) {
      this._streams.slice(index, 1);
    }
  }

  public emitStreamData(streamId: string, data: Buffer): void {
    this._websocketServer.to(streamId).emit(streamId, data);
  }

  public emitEventMessage(streamId: string, event: string, message: string): void {
    this._websocketServer.to(streamId).emit(event, message);
  }

  private getClientInfo(socket: Socket, streamId?: string): ClientInfo {
    const ip = socket.request.connection.remoteAddress;
    const userAgent = socket.request.headers["user-agent"];

    return {
      ipAddress: ip,
      userAgent: userAgent,
      streamId: streamId
    }
  }
}
