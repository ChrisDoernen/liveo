import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StreamsService } from './services/streams-service/streams-service';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { StreamComponent } from './components/stream/stream.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { ConfigurationService } from './services/configuration-service/configuration.service';
import { EndpointService } from './services/endpoint-service/endpoint.service';

export function initializeApp(ConfigurationService: ConfigurationService) {
  return () => ConfigurationService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SelectLanguageComponent,
    StreamComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EndpointService,
    StreamsService,
    ConfigurationService,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigurationService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
