import { Component, OnInit } from "@angular/core";
import { SessionEntity, SettingsEntity } from "@live/entities";
import { SettingsService } from "../../../../services/settings/settings.service";
import { SessionService } from "../../../shared/services/session/session.service";

@Component({
  selector: "settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

  public sessions: SessionEntity[];
  public settings: SettingsEntity;
  public bitrateOptions = [64, 96, 128, 192, 224];

  public constructor(
    private readonly _sessionService: SessionService,
    private readonly _settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    this._settingsService.getSettings().then((settings) => this.settings = settings);
    this._sessionService.getSessions().then((sessions) => this.sessions = sessions);
    // Maybe get default session from settings and preselect in dropdown
  }

  public onChange(change: any): void {
    this._settingsService.updateSettings(this.settings);
  }
}
