import { ClientInfo } from "./client-info";
import { ConnectionInfoType } from "./connection-info-type";

export interface ConnectionInfo {
  clientInfo: ClientInfo;
  timestamp: string;
  connectionInfoType: ConnectionInfoType;
  newConnectionCounterValue: number;
}
