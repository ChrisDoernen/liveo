import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAgentService {

  public userAgentInfo: any;

  public GetUserAgentInfo(): void {
    this.userAgentInfo = GetUserAgentInfo();
  }
}
