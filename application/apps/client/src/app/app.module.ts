import { HttpClientModule } from "@angular/common/http";
import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
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
import { WelcomeComponent } from "./components/welcome/welcome.component";

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
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [
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
    },
    {
      provide: ENABLECONSOLELOGGING,
      useValue: !environment.production
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
