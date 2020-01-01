import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NotficationsComponent } from "./components/notfications/notfications.component";
import { OfflineMessageComponent } from "./components/offline-message/offline-message.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavigationComponent,
    FooterComponent,
    NotficationsComponent,
    OfflineMessageComponent,
    LoginComponent,
    WelcomeComponent
  ],
  entryComponents: [
  ]
})
export class BaseModule { }