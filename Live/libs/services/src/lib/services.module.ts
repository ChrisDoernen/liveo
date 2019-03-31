import { NgModule } from "@angular/core";
import { ActivationService } from "./activation/activation.service";
import { DataService } from "./data/data.service";
import { StreamService } from "./stream/stream.service";
import { SessionService } from "./session/session.service";
import { EndpointService } from "./endpoint/endpoint.service";
import { UserAgentService } from "./user-agent/user-agent.service";

@NgModule({
  imports: [
  ],
  declarations: [
    ActivationService,
    DataService,
    EndpointService,
    SessionService,
    StreamService,
    UserAgentService
  ],
  exports: [
    ActivationService,
    DataService,
    EndpointService,
    SessionService,
    StreamService,
    UserAgentService
  ]
})
export class ServicesModule {
}