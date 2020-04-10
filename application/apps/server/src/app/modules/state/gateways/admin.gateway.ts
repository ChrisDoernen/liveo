import { ENDPOINTS, EVENTS } from "@liveo/constants";
import { ConnectedSocket, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AdminService } from "../services/admin/admin.service";

@WebSocketGateway({ path: ENDPOINTS.websocket })
export class AdminGateway implements OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private readonly _adminRoom = "admin";

  constructor(
    private readonly _adminService: AdminService
  ) {
  }

  @SubscribeMessage(EVENTS.subscribeAdmin)
  public onSubscibeAdmin(@ConnectedSocket() client: Socket): void {
    client.join(this._adminRoom);
    this._adminService.adminSubscribed(this.getClientIpAddress(client));
  }

  @SubscribeMessage(EVENTS.unsubscribeAdmin)
  public onunsubscibeAdmin(@ConnectedSocket() client: Socket): void {
    client.leave(this._adminRoom);
    this._adminService.adminUnsubscribed(this.getClientIpAddress(client));
  }

  @SubscribeMessage(EVENTS.adminStreamCreationEnter)
  public onAdminStreamCreationEnter(): void {
    this._adminService.onAdminStreamCreationEnter();

  }

  @SubscribeMessage(EVENTS.adminStreamCreationLeave)
  public onAdminStreamCreationLeave(): void {
    this._adminService.onAdminStreamCreationLeave();
  }

  public emit(event: string, message: any): void {
    this.server.to(this._adminRoom).emit(event, message);
  }

  public handleDisconnect(client: Socket) {
    this._adminService.clientDisconnected(this.getClientIpAddress(client));
  }

  private getClientIpAddress(socket: Socket): string {
    return socket.handshake.headers["x-real-ip"] || socket.handshake.address;
  }
}