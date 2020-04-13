import { Component, OnInit } from "@angular/core";
import { EVENTS } from "@liveo/constants";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "../../services/websocket/websocket.service";

@Component({
  selector: "footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

  public cpuUsage$: Observable<string>;

  constructor(
    private _websocketService: WebsocketService
  ) {
  }

  public ngOnInit(): void {
    this.cpuUsage$ = this._websocketService.fromEvent<string>(EVENTS.cpuUsage)
      .pipe(map((data) => (+data * 100).toFixed(0)));
  }
}
