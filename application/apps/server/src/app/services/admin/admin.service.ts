import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { Logger } from "../logging/logger";

@Injectable()
export class AdminService {

  private connectedAdmins = [];
  public streamCreation = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _logger: Logger
  ) {
  }

  public adminSubscribed(ip: string): void {
    this.connectedAdmins.push(ip);
    this._logger.debug(`Admin subscribed, ${this.connectedAdmins.length} admins connected`);
  }

  public onAdminStreamCreationEnter(): void {
    this._logger.debug("Admin entered stream creation");
    this.streamCreation.next(true);
  }

  public onAdminStreamCreationLeave() {
    this._logger.debug("Admin left stream creation");
    this.streamCreation.next(false);
  }

  public adminUnsubscribed(ip: string): void {
    const matchingIp = this.connectedAdmins.find((ipAddress) => ip === ipAddress);
    if (matchingIp) {
      this.connectedAdmins.splice(this.connectedAdmins.indexOf(matchingIp), 1);
      if (this.connectedAdmins.length === 0) {
        this.streamCreation.next(false);
      }
      this._logger.debug(`Admin unsubscribed, ${this.connectedAdmins.length} admins connected`);
    }
  }

  public clientDisconnected(ip: string): void {
    this.adminUnsubscribed(ip);
  }
}