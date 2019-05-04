import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { ActivityEntity } from "@live/entities";
import { ActivityService } from "../lib/activity/activity.service";

@controller("/activity")
export class ActivityController {
  constructor(
    @inject("ActivityService") private _activityService: ActivityService) {
  }

  @httpGet("/")
  public getActivity(): ActivityEntity {
    return this._activityService.getActivity();
  }
}
