import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ROUTES } from "@live/constants";
import { ENABLECONSOLELOGGING, ROUTE } from "@live/services";
import { InlineSVGModule } from "ng-inline-svg";
import { SocketIoModule } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { BaseModule } from "./modules/base/base.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { HeaderModule } from "./modules/header/header.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { SharedModule } from "./modules/shared/shared.module";
import { StreamsModule } from "./modules/streams/streams.module";
import { InitializationService } from "./services/initialization/initialization.service";

@NgModule({
  imports: [
    BaseModule,
    StreamsModule,
    SessionsModule,
    SharedModule,
    HeaderModule,
    DashboardModule,
    SettingsModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  declarations: [
    AppComponent
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
