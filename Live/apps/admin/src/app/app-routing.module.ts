import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { StreamsComponent } from "./components/streams/streams.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
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
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [ConnectionStateGuard]
  },
  {
    path: "streams",
    component: StreamsComponent
  },
  {
    path: "sessions",
    component: SessionsComponent
  },
  {
    path: "settings",
    component: SettingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
