import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SessionDeletionDialogComponent } from "./components/session-deletion-dialog/session-deletion-dialog.component";
import { SessionsComponent } from "./components/sessions/sessions.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SessionsComponent,
    SessionDeletionDialogComponent
  ],
  entryComponents: [
    SessionDeletionDialogComponent
  ]
})
export class SessionsModule { }