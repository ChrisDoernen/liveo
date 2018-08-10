import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StreamsComponent } from './streams.component';
import { StreamComponent } from './components/stream/stream.component';
import { StreamsService } from './services/streams-service.service';

@NgModule({
  declarations: [
    AppComponent,
    StreamsComponent,
    StreamComponent,
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
