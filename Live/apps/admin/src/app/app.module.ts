import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ROUTES } from "@live/constants";
import { ENABLECONSOLELOGGING, ROUTE } from "@live/services";
import { SocketIoModule } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { HeaderModule } from "./modules/header/header.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { SharedModule } from "./modules/shared/shared.module";
import { StreamsModule } from "./modules/streams/streams.module";
import { InitializationService } from "./services/initialization/initialization.service";

@NgModule({
  imports: [
    StreamsModule,
    SessionsModule,
    SharedModule,
    HeaderModule,
    DashboardModule,
    SettingsModule,
    AppRoutingModule,
    SocketIoModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    NotficationsComponent,
    NavigationComponent,
    FooterComponent,
    OfflineMessageComponent,
    LoginComponent,
    WelcomeComponent
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
