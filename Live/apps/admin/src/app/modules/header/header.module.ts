import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { LogoHeaderComponent } from "./components/logo-header/logo-header.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LogoHeaderComponent,
    HeaderComponent,
    ShutdownComponent,
    ShutdownDialogComponent
  ],
  entryComponents: [
    ShutdownDialogComponent
  ]
})
export class HeaderModule { }