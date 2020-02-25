import { inject, injectable } from "inversify";
import { BehaviorSubject } from "rxjs";
import { Logger } from "../logging/logger";

@injectable()
export class AdminService {

  private connectedAdmins = [];
  public streamCreation = new BehaviorSubject<boolean>(false);

  constructor(
    @inject("Logger") private _logger: Logger) {
  }

  public adminSubscribed(ip: string): void {
    this.connectedAdmins.push(ip);
    this._logger.debug(`Admin subscribed, ${this.connectedAdmins.length} admins connected`);
  }

  public onAdminStreamCreationEnter(): void {
    this._logger.info("Admin entered stream creation");
    this.streamCreation.next(true);
  }

  public onAdminStreamCreationLeave() {
    this._logger.info("Admin left stream creation");
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