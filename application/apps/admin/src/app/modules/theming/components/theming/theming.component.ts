import { Component, OnInit } from "@angular/core";
import { ThemeEntity } from "@liveo/entities";
import { ThemingClient } from "../../services/theming.client";

@Component({
  selector: "theming",
  templateUrl: "./theming.component.html",
  styleUrls: ["./theming.component.scss"]
})
export class ThemingComponent implements OnInit{

  public theme: ThemeEntity;
  public color: any;

  constructor(
    private readonly _themeClient: ThemingClient
  ) {
  }

  public ngOnInit(): void {
    this._themeClient.getTheme().then((theme) => this.theme = theme);
  }


}
