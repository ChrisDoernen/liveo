import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { StreamsComponent } from "./components/streams/streams.component";
import { SessionsComponent } from "./components/sessions/sessions.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "streams", component: StreamsComponent },
  { path: "sessions", component: SessionsComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
