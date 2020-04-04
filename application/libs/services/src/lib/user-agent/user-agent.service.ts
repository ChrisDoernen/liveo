import { Injectable } from "@angular/core";
import { UserAgentDetector, UserAgentInfo } from "@liveo/l3as";

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
