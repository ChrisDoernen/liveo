import { UserAgentInfo } from "./user-agent-info";

export declare class UserAgentDetector {

  /**
   * Get user agent info
   */
  getUserAgentInfo(): UserAgentInfo;

  /**
   * Check whether the browser is able to play mpeg
   */
  checkBrowserCompatibility(): boolean;
}
