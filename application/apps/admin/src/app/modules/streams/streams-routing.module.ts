import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StreamCreationComponent } from "./components/stream-creation/stream-creation.component";
import { StreamListComponent } from "./components/stream-list/stream-list.component";
import { StreamsComponent } from "./components/streams/streams.component";

const routes: Routes = [
  {
    path: "",
    component: StreamsComponent,
    children: [
      {
        path: "",
        component: StreamListComponent
      },
      {
        path: "new",
        component: StreamCreationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }