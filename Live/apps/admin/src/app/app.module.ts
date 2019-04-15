import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AngularMaterialModule } from "./angular-material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { ShutdownDialogComponent } from "./components/shutdown/shutdown-dialog.component";
import { HttpClientModule } from "@angular/common/http";
import { StreamsComponent } from "./components/streams/streams.component";
import { SessionsComponent } from "./components/sessions/sessions.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    ShutdownComponent,
    ShutdownDialogComponent,
    StreamsComponent,
    SessionsComponent
  ],
  entryComponents: [
    ShutdownDialogComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
