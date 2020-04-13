import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "../../core/services/logging/logger";

@WebSocketGateway({ path: ENDPOINTS.websocket })
export class StreamingGateway implements OnGatewayInit {

  private _server: Server;
  private readonly _adminRoom = "admin";

  /**
   * The currently available streams that are represented as rooms in socket.io 
   */
  private _streamingIdRooms: string[] = [];

  constructor(
    private readonly _logger: Logger
  ) {
  }

  public afterInit(server: Server) {
    this._server = server;
  }

  @SubscribeMessage(EVENTS.subscribeToStream)
  public onSubscribeToStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    const id = this._streamingIdRooms.find((stream) => stream === streamingId);

    if (!id) {
      this._logger.info(`Subscription for streaming source ${streamingId} not possible, stream is not started`);
      client.emit(EVENTS.subscriptionError, "The stream is not started.");
    } else {
      client.join(id);
    }
  }

  @SubscribeMessage(EVENTS.unsubscribeFromStream)
  public onUnsubscribeFromStream(@MessageBody() streamingId: string, @ConnectedSocket() client: Socket): void {
    client.leave(streamingId);
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
    this._server.to(streamingId).emit(EVENTS.streamData, data);
  }

  public emitStreamMessage(streamingId: string, event: string, message: string): void {
    this._server.to(streamingId).emit(event, message);
  }

  public emitAdminMessage(event: string, message: string): void {
    this._server.to(this._adminRoom).emit(event, message);
  }

  public emitMessage(event: string, message: string): void {
    this._server.emit(event, message);
  }
}
