import { HttpClientModule } from "@angular/common/http";
import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ROUTES } from "@liveo/constants";
import { ENABLECONSOLELOGGING, ROUTE, UserAgentService } from "@liveo/services";
import { InlineSVGModule } from "ng-inline-svg";
import { Ng5SliderModule } from "ng5-slider";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./components/about/about.component";
import { AudioPlayerComponent } from "./components/audio-player/audio-player.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { LogoComponent } from "./components/logo/logo.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ThemeService } from "./services/theme/theme.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AudioPlayerComponent,
    LogoComponent,
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
    InlineSVGModule.forRoot(),
    // ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [
    UserAgentService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (userAgentService: UserAgentService, themeService: ThemeService) => {
        return () => {
          userAgentService.initialize();
          themeService.initialize();
        }
      },
      deps: [UserAgentService, ThemeService],
      multi: true
    },
    {
      provide: ROUTE,
      useValue: ROUTES.client
    },
    {
      provide: ENABLECONSOLELOGGING,
      useValue: !environment.production
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
