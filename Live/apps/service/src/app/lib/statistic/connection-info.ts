import { ClientInfo } from "./client-info";
import { ConnectionInfoType } from "./connection-info-type";

export interface ConnectionInfo {
  clientInfo: ClientInfo;
  timestamp: number;
  connectionInfoType: ConnectionInfoType;
  newConnectionCounterValue: number;
}
