import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StreamsComponent } from './streams/streams.component';
import { StreamComponent } from './stream/stream.component';
import { StreamsService } from './streams.service';

@NgModule({
  declarations: [
    AppComponent,
    StreamsComponent,
    StreamComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    StreamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
