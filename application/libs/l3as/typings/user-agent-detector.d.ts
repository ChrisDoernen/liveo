import { UserAgentInfo } from "./user-agent-info";

export declare class UserAgentDetector {
  detectUserAgent(): UserAgentInfo;
  checkBrowserCompatibility(): boolean;
}