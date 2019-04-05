import { Injectable } from "@angular/core";
import { UserAgentInfo, UserAgentDetector } from "@live/l3as";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {
  public userAgentInfo: UserAgentInfo;
  public isBrowserCompatible: boolean;

  constructor() {
    const userAgentDetector = new UserAgentDetector();
    this.userAgentInfo = userAgentDetector.getUserAgentInfo();
    this.isBrowserCompatible = userAgentDetector.checkBrowserCompatibility();
  }
}
