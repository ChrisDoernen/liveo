import { inject, injectable } from "inversify";
import socketio from "socket.io";
import { Logger } from "../../../../server/src/app/services/logging/logger";
import { AdminService } from "../services/admin/admin.service";
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

  public emit(event: string, message: any): void {
    this._websocketServer.emit(event, message);
  }

}
