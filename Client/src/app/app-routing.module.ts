import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AudioPlayerComponent } from "./components/audio-player/audio-player.component";
import { AboutComponent } from "./components/about/about.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "home", component: HomeComponent, data: { animation: "HomePage" } },
  { path: "streams/audio/:id", component: AudioPlayerComponent },
  { path: "welcome", component: WelcomeComponent, data: { animation: "WelcomePage" } },
  { path: "about", component: AboutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
