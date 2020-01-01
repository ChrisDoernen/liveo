import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { NotificationEntity } from "@live/entities";
import { Subscription } from "rxjs";
import { NotificationService } from "../../../../services/notification/notification.service";

@Component({
  selector: "notifications",
  template: ``,
  styleUrls: ["./notfications.component.scss"]
})
export class NotficationsComponent implements OnInit, OnDestroy {

  private notificationSubscription: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private _notificationService: NotificationService) {
  }

  public ngOnInit() {
    this.notificationSubscription = this._notificationService.notifications$
      .subscribe((notification) => this.openSnackbar(notification));
  }

  private openSnackbar(notification: NotificationEntity): void {
    this._snackBar.open(notification.message, "Ok", {
      duration: 4000,
    });
  }

  public ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
