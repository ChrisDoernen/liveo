import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SessionComponent } from "./components/session/session.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { StreamComponent } from "./components/stream/stream.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "session", component: SessionComponent, data: { animation: "SessionPage" } },
  { path: "streams/:id", component: StreamComponent },
  { path: "welcome", component: WelcomeComponent, data: { animation: "WelcomePage" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
