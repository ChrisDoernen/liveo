import { NgModule } from "@angular/core";
import { ColorPickerModule } from "ngx-color-picker";
import { SharedModule } from "../shared/shared.module";
import { ThemingComponent } from "./components/theming/theming.component";
import { ThemeClient } from "./services/theme.client";
import { ThemingRoutingModule } from "./theming-routing.module";

@NgModule({
  imports: [
    ColorPickerModule,
    SharedModule,
    ThemingRoutingModule
  ],
  declarations: [
    ThemingComponent
  ],
  providers: [
    ThemeClient
  ]
})
export class ThemingModule { }
