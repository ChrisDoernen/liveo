import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InlineSVGModule } from "ng-inline-svg";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { LogoHeaderComponent } from "./components/logo-header/logo-header.component";
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
    BrowserModule,
    InlineSVGModule.forRoot()
  ],
  declarations: [
    ConfirmationDialogComponent,
    TitleBarComponent,
    LogoHeaderComponent,
    LogoComponent
  ],
  exports: [
    ConfirmationDialogComponent,
    TitleBarComponent,
    LogoHeaderComponent,
    LogoComponent,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    InlineSVGModule
  ]
})
export class SharedModule { }