import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StreamsService } from './services/streams-service.service';
import { SelectStreamsComponent } from './components/select-streams/select-streams.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectStreamsComponent,
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
