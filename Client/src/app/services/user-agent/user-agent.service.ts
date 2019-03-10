import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {

  public userAgentInfo: any;
  public isBrowserCompatible: boolean;

  constructor() {
    this.GetUserAgentInfo();
  }

  public GetUserAgentInfo(): void {
    this.userAgentInfo = GetUserAgentInfo();
    this.isBrowserCompatible = CheckBrowserCompatibility();
  }
}
