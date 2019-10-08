import { ROUTES } from "@live/constants";
import { ApplicationStateEntity } from "@live/entities";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ApplicationStateService } from "../../services/application-state/application-state.service";

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
