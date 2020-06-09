import { NgModule } from "@angular/core";
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from "../shared/shared.module";
import { ThemingComponent } from "./components/theming/theming.component";
import { ThemingClient } from "./services/theming.client";
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
    ThemingClient
  ]
})
export class ThemingModule { }
