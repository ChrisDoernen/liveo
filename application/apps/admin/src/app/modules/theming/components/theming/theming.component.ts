import { Component, OnInit } from "@angular/core";
import { ThemeEntity } from "@liveo/entities";
import { ThemeClient } from "../../services/theme.client";

@Component({
  selector: "theming",
  templateUrl: "./theming.component.html",
  styleUrls: ["./theming.component.scss"]
})
export class ThemingComponent implements OnInit {

  public theme: ThemeEntity;

  constructor(
    private readonly _themeClient: ThemeClient
  ) {
  }

  public ngOnInit(): void {
    this._themeClient.getTheme()
      .then((theme) => this.theme = theme);
  }

  public saveColor(color: string): void {
    this._themeClient.updateTheme(new ThemeEntity(color, this.theme.logo))
      .then((theme) => this.theme = theme);
  }
}
