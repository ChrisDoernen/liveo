import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ROUTES } from "@live/constants";
import { ENABLECONSOLELOGGING, ROUTE } from "@live/services";
import { InlineSVGModule } from "ng-inline-svg";
import { SocketIoModule } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ActivatedSessionTileComponent } from "./components/activated-session-tile/activated-session-tile.component";
import { ActivationDeletionDialogComponent } from "./components/activation-deletion-dialog/activation-deletion-dialog.component";
import { ActivationDialogComponent } from "./components/activation-dialog/activation-dialog.component";
import { ActivationStateTileComponent } from "./components/activation-state-tile/activation-state-tile.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { DashboardActivationComponent } from "./components/dashboard-activation/dashboard-activation.component";
import { DashboardNoActivationComponent } from "./components/dashboard-no-activation/dashboard-no-activation.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoHeaderComponent } from "./components/logo-header/logo-header.component";
import { LogoComponent } from "./components/logo/logo.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { StreamCreationDialogComponent } from "./components/stream-creation-dialog/stream-creation-dialog.component";
import { StreamDeletionDialogComponent } from "./components/stream-deletion-dialog/stream-deletion-dialog.component";
import { StreamsComponent } from "./components/streams/streams.component";
import { TitleBarComponent } from "./components/title-bar/title-bar.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { InitializationService } from "./services/initialization/initialization.service";

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
    ActivationStateTileComponent,
    OfflineMessageComponent,
    SettingsComponent,
    LoginComponent,
    WelcomeComponent,
    LogoHeaderComponent,
    StreamCreationDialogComponent,
    StreamDeletionDialogComponent,
    TitleBarComponent,
    HeaderComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ShutdownDialogComponent,
    ActivationDialogComponent,
    ActivationDeletionDialogComponent,
    StreamCreationDialogComponent,
    StreamDeletionDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    },
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
    },
    {
      provide: ENABLECONSOLELOGGING,
      useValue: !environment.production
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
