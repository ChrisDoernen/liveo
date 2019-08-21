import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { ApplicationStateEntity } from "@live/entities";
import { ApplicationStateService } from "../../lib/application-state/application-state.service";
import { ROUTES } from "@live/constants";

@controller(`/${ROUTES.client}/application-state`)
export class ApplicationStateController {
  constructor(
    @inject("ActivityService") private _activityService: ApplicationStateService) {
  }

  @httpGet("/")
  public getActivationExtended(): ApplicationStateEntity {
    return this._activityService.getApplicationState();
  }
}
