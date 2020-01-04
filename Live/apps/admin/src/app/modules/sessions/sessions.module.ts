import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SessionDeletionDialogComponent } from "./components/session-deletion-dialog/session-deletion-dialog.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SessionsRoutingModule } from "./sessions-routing.module";

@NgModule({
  imports: [
    SharedModule,
    SessionsRoutingModule
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