import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_BOOTSTRAP_LISTENER } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { AudioPlayerComponent } from "./components/audio-player/audio-player.component";
import { AppRoutingModule } from "./app-routing.module";
import { InlineSVGModule } from "ng-inline-svg";
import { Ng5SliderModule } from "ng5-slider";
import { HeaderComponent } from "./components/header/header.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AboutComponent } from "./components/about/about.component";
import { UserAgentService, ROUTE } from "@live/services";
import { ApplicationStateService } from "./services/application-state/application-state.service";
import { ROUTES } from "@live/constants";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AudioPlayerComponent,
    HeaderComponent,
    WelcomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    Ng5SliderModule,
    InlineSVGModule.forRoot()
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (applicationStateService: ApplicationStateService) => {
        return () => applicationStateService.loadApplicationState();
      },
      deps: [ApplicationStateService],
      multi: true
    },
    UserAgentService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (userAgentService: UserAgentService) => {
        return () => userAgentService.initialize();
      },
      deps: [UserAgentService],
      multi: true
    },
    {
      provide: ROUTE,
      useValue: ROUTES.client
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
