import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_BOOTSTRAP_LISTENER } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AngularMaterialModule } from "./angular-material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { HttpClientModule } from "@angular/common/http";
import { StreamsComponent } from "./components/streams/streams.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { ActivationDialogComponent } from "./components/activation-dialog/activation-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { LogoComponent } from "./components/logo/logo.component";
import { InlineSVGModule } from "ng-inline-svg";
import { ActivationDeletionDialogComponent } from "./components/activation-deletion-dialog/activation-deletion-dialog.component";
import { FooterComponent } from "./components/footer/footer.component"
import { SocketIoModule } from "ngx-socket-io";
import { InitializationService } from "./services/initialization/initialization.service";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { DashboardActivationComponent } from "./components/dashboard-activation/dashboard-activation.component";
import { DashboardNoActivationComponent } from "./components/dashboard-no-activation/dashboard-no-activation.component";
import { ActivatedSessionTileComponent } from "./components/activated-session-tile/activated-session-tile.component";
import { ActivationStateTileComponent } from "./components/activation-state-tile/activation-state-tile.component";
import { EndpointService, ROUTE } from "@live/services";
import { ROUTES } from "@live/constants";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SocketIoModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    LogoComponent,
    DashboardComponent,
    NavigationComponent,
    ShutdownComponent,
    ShutdownDialogComponent,
    StreamsComponent,
    SessionsComponent,
    ActivationDialogComponent,
    ActivationDeletionDialogComponent,
    FooterComponent,
    NotficationsComponent,
    DashboardActivationComponent,
    DashboardNoActivationComponent,
    ActivatedSessionTileComponent,
    ActivationStateTileComponent
  ],
  entryComponents: [
    ShutdownDialogComponent,
    ActivationDialogComponent,
    ActivationDeletionDialogComponent
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (initializationService: InitializationService) => {
        return () => initializationService.initialize();
      },
      deps: [InitializationService],
      multi: true
    },
    {
      provide: ROUTE,
      useValue: ROUTES.admin
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
