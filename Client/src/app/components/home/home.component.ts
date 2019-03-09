import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { UserAgentService } from "src/app/services/user-agent/user-agent.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  constructor(private _dataService: DataService,
    private _userAgentService: UserAgentService) { }

  public ngOnInit(): void {
    this._dataService.loadData();
  }
}
