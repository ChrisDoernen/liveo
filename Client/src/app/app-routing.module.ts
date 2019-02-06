import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AudioPlayerComponent } from "./components/audio-player/audio-player.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "home", component: HomeComponent, data: { animation: "HomePage" } },
  { path: "streams/:id", component: AudioPlayerComponent },
  { path: "welcome", component: WelcomeComponent, data: { animation: "WelcomePage" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
