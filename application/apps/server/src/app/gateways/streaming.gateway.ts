import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "../services/logging/logger";
import { ClientInfo } from "../services/statistics/client-info";
import { ConnectionHistoryService } from "../services/statistics/connection-history-service";

@WebSocketGateway({ path: ENDPOINTS.websocket })
export class StreamingGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  /** 
   * The currently available streams that are represented as rooms in socket.io 
   */
  private _streamingIdRooms: string[] = [];

  constructor(
    private readonly _logger: Logger,
    private readonly _connectionHistoryService: ConnectionHistoryService
  ) {
  }

  public handleConnection(client: Socket) {
    const clientInfo = this.getClientInfo(client);
    this._connectionHistoryService.clientConnected(clientInfo);
  }

  @SubscribeMessage(EVENTS.subscribeToStream)
  public onSubscribeToStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    const id = this._streamingIdRooms.find((stream) => stream === streamingId);

    if (!id) {
      this._logger.info(`Subscription for streaming source ${streamingId} not possible, stream is not started`);
      client.emit(EVENTS.subscriptionError, "The stream is not started.");
    } else {
      client.join(id);

      const clientInfo = this.getClientInfo(client, streamingId);
      this._connectionHistoryService.clientSubscribed(clientInfo);
    }
  }

  @SubscribeMessage(EVENTS.unsubscribeFromStream)
  public onUnsubscribeFromStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    client.leave(streamingId);
    const clientInfo = this.getClientInfo(client);
    this._connectionHistoryService.clientUnsubscribed(clientInfo);
  }

  private getClientInfo(client: Socket, streamId?: string): ClientInfo {
    return {
      ipAddress: this.getClientIpAddress(client),
      userAgent: this.getClientUserAgent(client),
      streamId: streamId
    }
  }

  public handleDisconnect(client: Socket) {
    const clientInfo = this.getClientInfo(client);
    this._connectionHistoryService.clientDisconnected(clientInfo);
  }

  private getClientUserAgent(socket: Socket): string {
    return socket.request.headers["user-agent"];
  }

  private getClientIpAddress(socket: Socket): string {
    return socket.handshake.headers["x-real-ip"] || socket.handshake.address;
  }

  public addStream(id: string): void {
    this._streamingIdRooms.push(id);
  }

  public removeStream(id: string): void {
    const index = this._streamingIdRooms.indexOf(id);
    if (index > -1) {
      this._streamingIdRooms.slice(index, 1);
    }
  }

  public emitStreamData(streamingId: string, data: Buffer): void {
    this.server.to(streamingId).emit(streamingId, data);
  }

  public emitStreamEventMessage(streamingId: string, event: string, message: string): void {
    this.server.to(streamingId).emit(event, message);
  }
}
