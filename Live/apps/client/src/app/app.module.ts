import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";
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
import { ActivityService, L3asService } from "@live/services";

export function activityServiceFactory(activityService: ActivityService) {
  return () => activityService.getActivity();
}

export function l3asServiceFactory(l3asService: L3asService) {
  return () => l3asService.initialize();
}

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
    ActivityService,
    { provide: APP_INITIALIZER, useFactory: activityServiceFactory, deps: [ActivityService], multi: true },
    L3asService,
    { provide: APP_INITIALIZER, useFactory: l3asServiceFactory, deps: [L3asService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
