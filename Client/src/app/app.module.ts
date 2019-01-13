import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { SessionService } from "./services/session/session.service";
import { SessionComponent } from "./components/session/session.component";
import { StreamComponent } from "./components/stream/stream.component";
import { AppRoutingModule } from "./app-routing.module";
import { EndpointService } from "./services/endpoint/endpoint.service";
import { InlineSVGModule } from "ng-inline-svg";
import { HeaderComponent } from "./components/header/header.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { StreamService } from "./services/stream/stream.service";

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    StreamComponent,
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    InlineSVGModule.forRoot()
  ],
  providers: [
    EndpointService,
    SessionService,
    StreamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
