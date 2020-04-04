import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SessionCreationComponent } from "./components/session-creation/session-creation.component";
import { SessionDeletionDialogComponent } from "./components/session-deletion-dialog/session-deletion-dialog.component";
import { SessionListComponent } from "./components/session-list/session-list.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SessionsRoutingModule } from "./sessions-routing.module";

@NgModule({
  imports: [
    SharedModule,
    SessionsRoutingModule
  ],
  declarations: [
    SessionsComponent,
    SessionListComponent,
    SessionCreationComponent,
    SessionDeletionDialogComponent
  ],
  entryComponents: [
    SessionDeletionDialogComponent
  ]
})
export class SessionsModule { }