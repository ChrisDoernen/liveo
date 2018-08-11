import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StreamsService } from './services/streams-service.service';
import { SelectStreamComponent } from './components/select-streams/select-stream.component';
import { StreamComponent } from './components/stream/stream.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectStreamComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    StreamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
