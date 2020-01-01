import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSelectChange, MatSlideToggleChange } from "@angular/material";
import { SessionEntity, SettingsEntity } from "@live/entities";
import { Subscription } from "rxjs";
import { SessionService } from "../../../../services/session/session.service";
import { SettingsService } from "../../../../services/settings/settings.service";

@Component({
  selector: "settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit, OnDestroy {

  public sessions: SessionEntity[];
  public settings: SettingsEntity;
  private _sessionsSubscription: Subscription;

  constructor(
    private _sessionService: SessionService,
    private _settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    this._settingsService.settings$.subscribe((settings) => this.settings = settings);
    this._sessionsSubscription = this._sessionService.getSessions().subscribe((sessions) => this.sessions = sessions);
    // Maybe get default session from settings and preselect in dropdown

  }

  public enableAutoActivationChanged(change: MatSlideToggleChange): void {
    // Check if the state really changed, otherwise it was the update
    if (change.checked === this.settings.enableAutoActivation) {
      return;
    }

    const updatedSettings = this.settings;
    updatedSettings.enableAutoActivation = change.checked;

    this._settingsService.updateSettings(updatedSettings);
  }

  public setSelectedSession(change: MatSelectChange): void {
    // Check if the state really changed, otherwise it was the update
    if (change.value === this.settings.defaultSession) {
      return;
    }

    const updatedSettings = this.settings;
    updatedSettings.defaultSession = change.value;

    this._settingsService.updateSettings(updatedSettings);
  }

  public ngOnDestroy(): void {
    this._sessionsSubscription.unsubscribe();
  }
}
