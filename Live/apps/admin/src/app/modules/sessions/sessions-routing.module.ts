import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SessionCreationComponent } from "./components/session-creation/session-creation.component";
import { SessionListComponent } from "./components/session-list/session-list.component";
import { SessionsComponent } from "./components/sessions/sessions.component";

const routes: Routes = [
  {
    path: "",
    component: SessionsComponent,
    children: [
      {
        path: "",
        component: SessionListComponent
      },
      {
        path: "new",
        component: SessionCreationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }