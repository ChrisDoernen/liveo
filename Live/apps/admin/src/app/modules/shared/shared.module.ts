import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { LogoComponent } from "./components/logo/logo.component";
import { TitleBarComponent } from "./components/title-bar/title-bar.component";

@NgModule({
  imports: [
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    TitleBarComponent,
    LogoComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule { }