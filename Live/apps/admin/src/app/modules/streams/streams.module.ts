import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { StreamCreationDialogComponent } from "./components/stream-creation-dialog/stream-creation-dialog.component";
import { StreamDeletionDialogComponent } from "./components/stream-deletion-dialog/stream-deletion-dialog.component";
import { StreamsComponent } from "./components/streams/streams.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    StreamsComponent,
    StreamDeletionDialogComponent,
    StreamCreationDialogComponent
  ],
  entryComponents: [
    StreamCreationDialogComponent,
    StreamDeletionDialogComponent
  ]
})
export class StreamsModule { }