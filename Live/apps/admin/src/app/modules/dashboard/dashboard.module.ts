import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ActivatedSessionTileComponent } from "./components/activated-session-tile/activated-session-tile.component";
import { ActivationDeletionDialogComponent } from "./components/activation-deletion-dialog/activation-deletion-dialog.component";
import { ActivationDialogComponent } from "./components/activation-dialog/activation-dialog.component";
import { ActivationStateTileComponent } from "./components/activation-state-tile/activation-state-tile.component";
import { DashboardActivationComponent } from "./components/dashboard-activation/dashboard-activation.component";
import { DashboardNoActivationComponent } from "./components/dashboard-no-activation/dashboard-no-activation.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    ActivationDialogComponent,
    ActivationDeletionDialogComponent,
    DashboardActivationComponent,
    DashboardNoActivationComponent,
    ActivatedSessionTileComponent,
    ActivationStateTileComponent
  ],
  entryComponents: [
    ActivationDialogComponent,
    ActivationDeletionDialogComponent
  ]
})
export class DashboardModule { }