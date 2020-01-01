import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    ShutdownComponent,
    ShutdownDialogComponent
  ],
  entryComponents: [
    ShutdownDialogComponent
  ]
})
export class HeaderModule { }