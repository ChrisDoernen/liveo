import { NgModule } from "@angular/core";
import { SharedModule } from "../../modules/shared/shared.module";
import { StreamCreationComponent } from "./components/stream-creation/stream-creation.component";
import { StreamDeletionDialogComponent } from "./components/stream-deletion-dialog/stream-deletion-dialog.component";
import { StreamListComponent } from "./components/stream-list/stream-list.component";
import { StreamsComponent } from "./components/streams/streams.component";
import { StreamsRoutingModule } from "./streams-routing.module";

@NgModule({
  imports: [
    SharedModule,
    StreamsRoutingModule
  ],
  declarations: [
    StreamListComponent,
    StreamDeletionDialogComponent,
    StreamCreationComponent,
    StreamsComponent
  ],
  entryComponents: [
    StreamDeletionDialogComponent
  ]
})
export class StreamsModule { }