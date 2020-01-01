import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StreamsComponent } from "./components/streams/streams.component";

const routes: Routes = [
  {
    path: "",
    component: StreamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }