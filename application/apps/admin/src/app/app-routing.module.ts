import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
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
    canActivate: [ConnectionStateGuard, AuthenticationGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: () => import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "streams",
        loadChildren: () => import("./modules/streams/streams.module").then((m) => m.StreamsModule),
      },
      {
        path: "sessions",
        loadChildren: () => import("./modules/sessions/sessions.module").then((m) => m.SessionsModule),
      },
      {
        path: "settings",
        loadChildren: () => import("./modules/settings/settings.module").then((m) => m.SettingsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
