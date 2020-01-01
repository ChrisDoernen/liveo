import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SettingsComponent } from "./components/settings/settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ],
  entryComponents: [
  ]
})
export class SettingsModule { }