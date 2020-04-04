import { UserAgentInfo, UserAgentDetector } from "@live/l3as";
import { Injectable } from "@angular/core";

@Injectable()
export class UserAgentService {
  /** The user agent info */
  userAgentInfo: UserAgentInfo;

  /** Whether the browser is compatible for playing mpeg */
  isBrowserCompatible: boolean;

  initialize(): void {
    const userAgentDetector = new UserAgentDetector();
    this.userAgentInfo = userAgentDetector.detectUserAgent();
    this.isBrowserCompatible = userAgentDetector.checkBrowserCompatibility();
  }
}
