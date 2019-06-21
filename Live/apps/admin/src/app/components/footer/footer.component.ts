import { Component, OnInit } from "@angular/core";
import { SystemMonitoringService } from "../../services/system-monitoring/system-monitoring.service";
import { Observable } from "rxjs";

@Component({
  selector: "footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  public cpuUsage: Observable<string>;

  constructor(private _systemMonitoringService: SystemMonitoringService) { }

  ngOnInit() {
    this.cpuUsage = this._systemMonitoringService.getCPUUsage();
  }

}
