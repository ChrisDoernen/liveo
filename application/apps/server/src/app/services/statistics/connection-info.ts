import { ClientInfo } from "./client-info";
import { ConnectionInfoType } from "./connection-info-type";

export interface ConnectionInfo {
  clientInfo: ClientInfo;
  timestamp: Date;
  connectionInfoType: ConnectionInfoType;
  newListeningCounterValue: number;
}
