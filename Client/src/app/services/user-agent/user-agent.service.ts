import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {

  public userAgentInfo: any;
  public isBrowserCompatible: boolean;

  public GetUserAgentInfo(): void {
    this.userAgentInfo = GetUserAgentInfo();
    this.isBrowserCompatible = CheckBrowserCompatibility();
  }
}
