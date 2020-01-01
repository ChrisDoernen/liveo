import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { ConnectionStateGuard } from "./guards/connection-state.guard";
import { DashboardComponent } from "./modules/dashboard/components/dashboard/dashboard.component";
import { SessionsComponent } from "./modules/sessions/components/sessions/sessions.component";
import { SettingsComponent } from "./modules/settings/components/settings/settings.component";
import { StreamsComponent } from "./modules/streams/components/streams/streams.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full"
  },
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "offline",
    component: OfflineMessageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: NavigationComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [ConnectionStateGuard, AuthenticationGuard]
      },
      {
        path: "streams",
        component: StreamsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "sessions",
        component: SessionsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [ConnectionStateGuard, AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
