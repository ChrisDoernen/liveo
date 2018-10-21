import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './services/session-service/session-service';
import { SessionComponent } from './components/session/session.component';
import { StreamComponent } from './components/stream/stream.component';
import { AppRoutingModule } from './app-routing.module';
import { EndpointService } from './services/endpoint-service/endpoint.service';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EndpointService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
