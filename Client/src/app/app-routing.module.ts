import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SessionComponent } from "./components/session/session.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { StreamComponent } from "./components/stream/stream.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "session", component: SessionComponent },
  { path: "stream/:id", component: StreamComponent },
  { path: "welcome", component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
