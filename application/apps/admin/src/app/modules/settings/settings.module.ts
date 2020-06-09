import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SettingsComponent } from "./components/settings/settings.component";
import { SettingsClient } from "./services/settings.client";
import { SettingsRoutingModule } from "./settings-routing.module";

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    SettingsClient
  ]
})
export class SettingsModule { }
