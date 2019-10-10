import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { StreamsComponent } from "./components/streams/streams.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { ConnectionStateGuard } from "./guards/connection-state.guard";

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
