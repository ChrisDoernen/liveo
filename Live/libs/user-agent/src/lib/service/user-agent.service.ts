import { Injectable } from "@angular/core";
import { UserAgentInfo, GetUserAgentInfo, CheckBrowserCompatibility } from "@live/l3as";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {
  public userAgentInfo: UserAgentInfo;
  public isBrowserCompatible: boolean;

  constructor() {
    this.userAgentInfo = GetUserAgentInfo();
    this.isBrowserCompatible = CheckBrowserCompatibility();
  }
}
