import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "../../core/services/logging/logger";
import { ClientInfo } from "../connections/client-info";
import { ConnectionHistoryService } from "../services/connection-history/connection-history-service";

@WebSocketGateway({ path: ENDPOINTS.websocket })
export class StatiaticsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private _server: Server;

  constructor(
    private readonly _logger: Logger,
    private readonly _connectionHistoryService: ConnectionHistoryService
  ) {
  }

  public afterInit(server: Server) {
    this._server = server;
    this._connectionHistoryService.listentingCounter$.subscribe((listeners) => {
      this.emitMessage(EVENTS.listeningClients, listeners.toString());
    });
  }

  public handleConnection(client: Socket) {
    const clientInfo = this.getClientInfo(client);
    this._connectionHistoryService.clientConnected(clientInfo);
  }

  @SubscribeMessage(EVENTS.subscribeToStream)
  public onSubscribeToStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    const clientInfo = this.getClientInfo(client, streamingId);
    this._connectionHistoryService.clientSubscribed(clientInfo);
  }

  @SubscribeMessage(EVENTS.unsubscribeFromStream)
  public onUnsubscribeFromStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    client.leave(streamingId);
    const clientInfo = this.getClientInfo(client);
    this._connectionHistoryService.clientUnsubscribed(clientInfo);
  }

  @SubscribeMessage(EVENTS.subscribeAdmin)
  public onSubscibeAdmin(@ConnectedSocket() client: Socket): void {
    client.emit(EVENTS.listeningClients, this._connectionHistoryService.listeningCounter);
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

  private emitMessage(event: string, message: string): void {
    this._server.emit(event, message);
  }
}
