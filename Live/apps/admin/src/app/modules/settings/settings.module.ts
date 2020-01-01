import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SettingsComponent } from "./components/settings/settings.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SettingsComponent
  ],
  entryComponents: [
  ]
})
export class SettingsModule { }