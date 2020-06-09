import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ThemingComponent } from "./components/theming.component";
import { ThemingRoutingModule } from "./theming-routing.module";

@NgModule({
  imports: [
    SharedModule,
    ThemingRoutingModule
  ],
  declarations: [
    ThemingComponent
  ]
})
export class ThemingModule { }
