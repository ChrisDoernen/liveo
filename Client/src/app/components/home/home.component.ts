import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data/data.service";
import { UserAgentService } from "src/app/services/user-agent/user-agent.service";
import { Stream } from "src/app/entities/stream.entity";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  private _selectedStream: Stream = null;

  constructor(private _dataService: DataService,
    private _userAgentService: UserAgentService) { }

  public ngOnInit(): void {
    this._dataService.loadData();
  }

  public selectStream(stream: Stream): void {
    console.log(`Click event on stream ${stream.id}.`);
    if (this._selectedStream == stream) {
      this._selectedStream = null;
    } else {
      this._selectedStream = stream;
    }
  }
}
