import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { NotificationEntity } from "@liveo/entities";
import { inject, injectable } from "inversify";
import socketio, { Socket } from "socket.io";
import { Logger } from "../../../../server/src/app/services/logging/logger";
import { AdminService } from "../services/admin/admin.service";
import { ClientInfo } from "../services/statistics/client-info";
import { ConnectionHistoryService } from "../services/statistics/connection-history-service";

@injectable()
export class WebsocketServer {

  private _websocketServer: socketio.Server;

  /** The currently available streams that are represented as rooms in socket.io */
  private _streamingSourceIds: string[] = [];

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("ConnectionHistoryService") private _connectionHistoryService: ConnectionHistoryService,
    @inject("AdminService") private readonly _adminService: AdminService) {
  }

  public initializeAndListen(server: any): void {
    const websocketServer = socketio(server, { path: ENDPOINTS.websocket });

    websocketServer.on("connection", this.onConnection.bind(this));
    this._websocketServer = websocketServer;
    this._logger.debug("Websocket server started.");
  }

  private onConnection(socket: Socket): void {
    this.onConnect(socket);

    socket.on(EVENTS.subscribe, streamingSourceId => {
      this.onSubscribeToStream(socket, streamingSourceId);
    });

    socket.on(EVENTS.unsubscribe, streamingSourceId => {
      this.onUnsubscribeFromStream(socket, streamingSourceId);
    });

    socket.on(EVENTS.subscribeAdmin, () => {
      this.onSubscribeAdmin(socket);
    });

    socket.on(EVENTS.unsubscribeAdmin, () => {
      this.onUnsubscribeAdmin(socket);
    });

    socket.on("disconnect", () => {
      this.onDisconnect(socket);
    });
  }

  private onSubscribeToStream(socket: Socket, streamingSourceId: string): void {
    const id = this._streamingSourceIds.find((stream) => stream === streamingSourceId);

    if (!id) {
      this._logger.info(`Subscription for streaming source ${streamingSourceId} not possible, stream is not started`);
      socket.emit(EVENTS.subscriptionError, "The stream is not started.");
    } else {
      socket.join(id);

      const clientInfo = this.getClientInfo(socket, streamingSourceId);
      this._connectionHistoryService.clientSubscribed(clientInfo);
    }
  }

  private onUnsubscribeFromStream(socket: Socket, streamId: string): void {
    socket.leave(streamId);
    const clientInfo = this.getClientInfo(socket);
    this._connectionHistoryService.clientUnsubscribed(clientInfo);
  }

  private onSubscribeAdmin(socket: Socket): void {
    socket.join("admin");
    this._adminService.adminSubscribed(this.getClientIpAddress(socket));

    socket.on(EVENTS.adminStreamCreationEnter, () => {
      this._adminService.onAdminStreamCreationEnter();
    });

    socket.on(EVENTS.adminStreamCreationLeave, () => {
      this._adminService.onAdminStreamCreationLeave();
    });
  }

  private onUnsubscribeAdmin(socket: Socket): void {
    socket.leave("admin");
    this._adminService.adminUnsubscribed(this.getClientIpAddress(socket));
  }

  private onConnect(socket: Socket): void {
    const clientInfo = this.getClientInfo(socket);
    this._connectionHistoryService.clientConnected(clientInfo);
  }

  private onDisconnect(socket: Socket): void {
    const clientInfo = this.getClientInfo(socket);
    this._connectionHistoryService.clientDisconnected(clientInfo);
    this._adminService.clientDisconnected(this.getClientIpAddress(socket));
  }

  public addStream(id: string): void {
    this._streamingSourceIds.push(id);
  }

  public removeStream(id: string): void {
    const index = this._streamingSourceIds.indexOf(id);
    if (index > -1) {
      this._streamingSourceIds.slice(index, 1);
    }
  }

  public emitStreamData(streamId: string, data: Buffer): void {
    this._websocketServer.to(streamId).emit(streamId, data);
  }

  public emitStreamEventMessage(streamId: string, event: string, message: string): void {
    this._websocketServer.to(streamId).emit(event, message);
  }

  public emitAdminEventMessage(event: string, message: string | NotificationEntity): void {
    this._websocketServer.to("admin").emit(event, message);
  }

  public emit(event: string, message: any): void {
    this._websocketServer.emit(event, message);
  }

  private getClientInfo(socket: Socket, streamId?: string): ClientInfo {
    return {
      ipAddress: this.getClientIpAddress(socket),
      userAgent: this.getClientUserAgent(socket),
      streamId: streamId
    }
  }

  private getClientUserAgent(socket: Socket): string {
    return socket.request.headers["user-agent"];
  }

  private getClientIpAddress(socket: Socket): string {
    return socket.handshake.headers["x-real-ip"] || socket.handshake.address;
  }
}
