import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/settings/settings.service";
import { SettingsEntity } from "@live/entities";
import { MatSlideToggleChange } from "@angular/material";

@Component({
  selector: "settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

  public settings: SettingsEntity;

  constructor(
    private _settingsService: SettingsService) {
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

  public ngOnInit() {
    this._settingsService.settings$.subscribe((settings) => this.settings = settings);
  }

}
