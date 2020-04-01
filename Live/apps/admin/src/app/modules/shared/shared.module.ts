import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { InlineSVGModule } from "ng-inline-svg";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { ContentComponent } from "./components/content/content.component";
import { LogoHeaderComponent } from "./components/logo-header/logo-header.component";
import { LogoComponent } from "./components/logo/logo.component";
import { TitleBarComponent } from "./components/title-bar/title-bar.component";
import { VolumeMeterComponent } from "./components/volume-meter/volume-meter.component";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { HoursMinutesSecondsPipe } from "./pipes/hours-minutes-seconds.pipe";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { DevicesService } from "./services/devices/devices.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot()
  ],
  declarations: [
    ConfirmationDialogComponent,
    TitleBarComponent,
    LogoHeaderComponent,
    LogoComponent,
    ContentComponent,
    VolumeMeterComponent,
    HoursMinutesSecondsPipe
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ConfirmationDialogComponent,
    TitleBarComponent,
    LogoHeaderComponent,
    LogoComponent,
    ContentComponent,
    VolumeMeterComponent,
    HoursMinutesSecondsPipe
  ],
  providers: [
    AuthenticationService,
    DevicesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})
export class SharedModule { }