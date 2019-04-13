import { NgModule } from "@angular/core";
import { MatSidenavModule, MatButtonModule, MatIconModule } from "@angular/material";

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }