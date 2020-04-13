import { APP_BOOTSTRAP_LISTENER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ROUTES } from "@liveo/constants";
import { ENABLECONSOLELOGGING, ROUTE } from "@liveo/services";
import { SocketIoModule } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { ShutdownDialogComponent } from "./components/shutdown-dialog/shutdown-dialog.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { SharedModule } from "./modules/shared/shared.module";
import { InitializationService } from "./services/initialization/initialization.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SocketIoModule,
    // ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    NotficationsComponent,
    NavigationComponent,
    FooterComponent,
    OfflineMessageComponent,
    LoginComponent,
    WelcomeComponent,
    ShutdownComponent,
    ShutdownDialogComponent,
    HeaderComponent
  ],
  entryComponents: [
    ShutdownDialogComponent
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
