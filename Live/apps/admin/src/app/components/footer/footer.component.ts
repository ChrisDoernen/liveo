import { Component, OnInit } from "@angular/core";
import { SystemMonitoringService } from "../../services/system-monitoring/system-monitoring.service";

@Component({
  selector: "footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

  constructor(
    public systemMonitoringService: SystemMonitoringService) {
  }
}
