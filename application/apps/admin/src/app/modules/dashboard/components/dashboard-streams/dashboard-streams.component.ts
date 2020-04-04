import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { StreamEntity } from "@liveo/entities";

@Component({
  selector: "dashboard-streams",
  templateUrl: "./dashboard-streams.component.html",
  styleUrls: ["./dashboard-streams.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStreamsComponent implements OnInit {

  @Input()
  public streams: StreamEntity[] = [];

  constructor() { }

  ngOnInit() {
  }

}
