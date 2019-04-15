import { NgModule } from "@angular/core";
import { MatSidenavModule, MatButtonModule, MatIconModule, MatDialogModule } from "@angular/material";

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule { }